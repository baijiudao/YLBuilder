/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  ContentOperator.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               图库文件操作类
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/6
** Descriptions:               END
** 
*********************************************************************************************************/
#include "ContentOperator.h"
#include <QFile>
#include <QDebug>
#include <QDir>
#define  MAX_LEN_OF_NAME  255
/**
* @brief： 重载<<
* @param[in]: stream
* @param[in]: filehead
* @return: QT_NAMESPACE::QDataStream &
*/
QDataStream &operator<<(QDataStream &stream, const FileHead &filehead)
{
	stream << filehead.m_magic
		<< filehead.m_version
		<< filehead.m_indexTableOffsetInFile
		<< filehead.m_reserved;
	return stream;
}

/**
* @brief：重载>>
* @param[in]: stream
* @param[in]: filehead
* @return: QT_NAMESPACE::QDataStream &
*/
QDataStream &operator>>(QDataStream &stream, FileHead &filehead)
{
	stream >> filehead.m_magic
		>> filehead.m_version
		>> filehead.m_indexTableOffsetInFile
		>> filehead.m_reserved;
	return stream;
}

/**
* @brief：重载<<操作符 写入
* @param[in]: stream
* @param[in]: indextable
* @return: QT_NAMESPACE::QDataStream &
*/
QDataStream &operator<<(QDataStream &stream, const IndexTable &indextable)
{
	QList<CONTENT_INDEX_TABLE>::const_iterator iter;

	stream << indextable.m_indexCount;

	for (iter = indextable.m_aIndexTableList.cbegin(); iter != indextable.m_aIndexTableList.cend(); iter++)
	{
		QByteArray name = iter->fileName.left(MAX_LEN_OF_NAME).toUtf8();
		name.insert(name.size(), MAX_LEN_OF_NAME + 1 - name.size(), 0);
		stream << name
			<< iter->contentOffsetInFile
			<< iter->fileLength
			<< iter->reserved;
	}
	return stream;
}

/**
* @brief：重载>>操作符 read
* @param[in]: stream
* @param[in]: indextable
* @return: QT_NAMESPACE::QDataStream &
*/
QDataStream &operator>>(QDataStream &stream, IndexTable &indextable)
{
	CONTENT_INDEX_TABLE indexcontent;

	indextable.m_aIndexTableList.clear();
		stream >> indextable.m_indexCount;
	for (quint32 i = 0; i < indextable.m_indexCount; i++)
	{
		QByteArray name(MAX_LEN_OF_NAME + 1, '\0');
		stream >> name
			>> indexcontent.contentOffsetInFile
			>> indexcontent.fileLength
			>> indexcontent.reserved;

		indexcontent.fileName.clear();
		indexcontent.fileName.insert(0, name);
		indextable.m_aIndexTableList.append(indexcontent);
	}
	return stream;
}

ContentOperator::ContentOperator(QObject *parent)
	: QObject(parent)
	, m_filePath("")
{
}

ContentOperator::~ContentOperator()
{
}

/**
 * @brief: 更新文件头
 */
void ContentOperator::updataHead()
{
	QFile file(m_filePath);
	file.open(QIODevice::WriteOnly);
	file.seek(0);
	QDataStream out(&file);
	out << m_fileHead;
	file.close();
}

/**
* @brief:新建图库文件
* @param[in]:filePath
*/
void ContentOperator::create(const QString fileName)
{
	m_fileHead.m_indexTableOffsetInFile = 16;
	QFile file(fileName);
	file.open(QIODevice::WriteOnly);
	file.seek(0);
	QDataStream out(&file);
	out << m_fileHead;
	file.close();
//	setFilePath(fileName);
}

/**        
 * @brief: 读取图库文件基本信息
 */
void ContentOperator::readFile()
{
	QFile file(m_filePath);
	file.open(QIODevice::ReadOnly);
	QDataStream in(&file);
	in >> m_fileHead;
	qDebug() << "index:" << m_fileHead.m_indexTableOffsetInFile;
	file.seek(m_fileHead.m_indexTableOffsetInFile);
	in >> m_indexTable;
	file.close();
}

/**        
 * @brief:  添加svg图片到图库
 * @param[in]:  filepath
 */
void ContentOperator::addSVG(const QString filePath)
{
	CONTENT_INDEX_TABLE table;
	int length = filePath.lastIndexOf(".") - filePath.lastIndexOf("/") - 1;
	table.fileName = filePath.mid(filePath.lastIndexOf("/") + 1, length); 
	table.reserved = 0;

	QFile svgFile(filePath);
	svgFile.open(QIODevice::ReadOnly);
	QByteArray array = svgFile.readAll();
	svgFile.close();

	QFile file(m_filePath);
	file.open(QIODevice::ReadWrite);

	table.contentOffsetInFile = m_fileHead.m_indexTableOffsetInFile;
	table.fileLength = array.length();

	file.seek(m_fileHead.m_indexTableOffsetInFile);
	QDataStream out(&file);
	out << array;
	m_fileHead.m_indexTableOffsetInFile = file.pos();
	//updataHead();
	m_indexTable.m_aIndexTableList.append(table);
	m_indexTable.m_indexCount = m_indexTable.m_indexCount + 1;
	out << m_indexTable;
	file.seek(0);
	out << m_fileHead;
	file.close();
}

/**        
 * @brief: 不允许名称一样的svg添加到同一个图库       
 * @param[in]:  list
 */
void ContentOperator::readSVG(QStringList &list)
{
	QDir dir;
	dir.rmdir("./temp/");
	dir.mkdir("./temp/");

	QFile IcgFile(m_filePath);
	IcgFile.open(QIODevice::ReadOnly);
	for (int i = 0; i < m_indexTable.m_aIndexTableList.count(); ++i)
	{
		IcgFile.seek(m_indexTable.m_aIndexTableList.at(i).contentOffsetInFile + 4);
		QByteArray array;
		array = IcgFile.read(m_indexTable.m_aIndexTableList.at(i).fileLength);
		QString path ="./temp/" + m_indexTable.m_aIndexTableList.at(i).fileName + ".svg";
		list.append(path);
		//手动新建一个temp文件夹底下的打开失败就没有了
		QFile SvgFile(path);
		SvgFile.open(QIODevice::WriteOnly);
		QTextStream textStream(&SvgFile);
		textStream << array;
		SvgFile.close();
	}
	IcgFile.close();
}

/**        
 * @brief:  编辑图库中文件      
 */
void ContentOperator::saveSVG(QString filePath)
{
 	QString name = filePath.mid(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf(".") -1);
 	bool state = false;
	QList<CONTENT_INDEX_TABLE> IndexTableList;
	QFile oldFile(m_filePath);
	oldFile.open(QIODevice::ReadOnly);
	
	QFile::remove("./temp.icg");
	create("./temp.icg");
	QFile newFile("./temp.icg");
	newFile.open(QIODevice::WriteOnly);
	QDataStream out(&newFile);
	for (int i = 0; i < m_indexTable.m_aIndexTableList.count(); ++i)
	{
		CONTENT_INDEX_TABLE table;
		table.fileName = m_indexTable.m_aIndexTableList.at(i).fileName;
		table.contentOffsetInFile = newFile.pos();
		table.reserved = 0;
		QByteArray array;
		if (m_indexTable.m_aIndexTableList.at(i).fileName != name)
		{
			oldFile.seek(m_indexTable.m_aIndexTableList.at(i).contentOffsetInFile + 4);
			array = oldFile.read(m_indexTable.m_aIndexTableList.at(i).fileLength);
			out << array;
		}
		else
		{
			QFile file(filePath);
			file.open(QIODevice::ReadOnly);
			array = file.readAll();
			out << array;
			file.close();
		}
		table.fileLength = array.length();
		IndexTableList.append(table);
	}
	m_fileHead.m_indexTableOffsetInFile = newFile.pos();
	m_indexTable.m_aIndexTableList.clear();
	m_indexTable.m_aIndexTableList = IndexTableList;
	out << m_indexTable;

	newFile.seek(0);
	out << m_fileHead;

	oldFile.close();
	newFile.close();

	QFile::remove(m_filePath);
	QFile::copy("./temp.icg", m_filePath);
}

/**        
 * @brief: 删除图库中指定的svg图片
 * @param[in]:  filePath
 */
void ContentOperator::removeSVG(QString filePath)
{
	int length = filePath.lastIndexOf(".") - filePath.lastIndexOf("/") - 1;
	QString fileName = filePath.mid(filePath.lastIndexOf("/") + 1, length);

	for (int j = 0; j < m_indexTable.m_aIndexTableList.count(); ++j)
	{
		if (m_indexTable.m_aIndexTableList.at(j).fileName == fileName)
		{
			m_indexTable.m_aIndexTableList.removeAt(j);
			m_indexTable.m_indexCount -= 1;
			break;
		}
	}

	QString name = filePath.mid(filePath.lastIndexOf("/") + 1, filePath.lastIndexOf(".") - 1);

	bool state = false;
	QList<CONTENT_INDEX_TABLE> IndexTableList;

	QFile oldFile(m_filePath);
	oldFile.open(QIODevice::ReadOnly);

	create("./temp.icg");
	QFile newFile("./temp.icg");
	newFile.open(QIODevice::WriteOnly);
	newFile.seek(16);
	QDataStream out(&newFile);

	for (int i = 0; i < m_indexTable.m_aIndexTableList.count(); ++i)
	{
		CONTENT_INDEX_TABLE table;
		table.fileName = m_indexTable.m_aIndexTableList.at(i).fileName;
		table.contentOffsetInFile = newFile.pos();
		table.reserved = 0;
		QByteArray array;
	
		oldFile.seek(m_indexTable.m_aIndexTableList.at(i).contentOffsetInFile + 4);
		array = oldFile.read(m_indexTable.m_aIndexTableList.at(i).fileLength);
		out << array;

		table.fileLength = array.length();
		IndexTableList.append(table);
	}
	m_fileHead.m_indexTableOffsetInFile = newFile.pos();
	m_indexTable.m_aIndexTableList.clear();
	m_indexTable.m_aIndexTableList = IndexTableList;
	out << m_indexTable;

	newFile.seek(0);
	out << m_fileHead;

	oldFile.close();
	newFile.close();

	QFile::remove(m_filePath);
	QFile::copy("./temp.icg", m_filePath);
}

/**
* @brief:  重命名文件名称
* @param[in]:  oldName
* @param[in]:  newName
*/
void ContentOperator::updataTabelIndex(const QString oldName, const QString newName)
{
	//更新tableIndex
// 	foreach(CONTENT_INDEX_TABLE str, m_indexTable.m_aIndexTableList)
// 	{
// 		if (str.fileName == oldName)
// 		{
// 			str.fileName = newName;
// 		}
// 	}

	for (int i = 0; i < m_indexTable.m_aIndexTableList.count(); ++i)
	{
	    if (m_indexTable.m_aIndexTableList.at(i).fileName == oldName)
	    {
			m_indexTable.m_aIndexTableList[i].fileName = newName;
			break;
	    }
	}
	QFile file(m_filePath);
	//readwrite权限
	file.open(QIODevice::ReadWrite);
	QDataStream out(&file);
	file.seek(m_fileHead.m_indexTableOffsetInFile);
	out << m_indexTable;
	file.close();
}