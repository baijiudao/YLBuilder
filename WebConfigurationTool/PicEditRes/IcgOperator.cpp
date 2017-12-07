/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  IcgOperator.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/7/12
** Descriptions:               END
** 
*********************************************************************************************************/
#include "IcgOperator.h"
#include <QFile>
#include <QDir>
#include <qDebug>
#include <QApplication>
#define FORCEDXML(str) reinterpret_cast<const wchar_t *>(QString(str).utf16())
IcgOperator::IcgOperator(QString icgName, QObject *parent)
	: QObject(parent)
	, m_filePath(icgName)
{
	makeIcg(m_filePath);
}

IcgOperator::~IcgOperator()
{
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgOperator::init()
{

}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
bool IcgOperator::makeIcg(QString fileName)
{
	CMarkup xml;
	xml.SetDoc(FORCEDXML("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n"));
	xml.AddElem(FORCEDXML("SvgGrounp"));
	xml.Save(FORCEDXML(fileName));
	m_filePath = fileName;
	return true;
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgOperator::addSVG(const QString fileName) const
{
	QString name = fileName.mid(fileName.lastIndexOf("/") + 1);
	//TODO 判断是否存在同名文件
	QByteArray array = readFile(fileName);
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCEDXML(m_filePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		xml.AddChildElem(FORCEDXML("Svg"));
		xml.AddChildAttrib(FORCEDXML("name"), FORCEDXML(name));
		xml.AddChildAttrib(FORCEDXML("Data"), FORCEDXML(array));
	}
	xml.Save(FORCEDXML(m_filePath));
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgOperator::removeSVG(const QString fileName) const
{
	QString name = fileName.mid(fileName.lastIndexOf("/") + 1);
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCEDXML(m_filePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		while (xml.FindChildElem(FORCEDXML("Svg")))
		{
			MCD_STR strID = xml.GetChildAttrib(FORCEDXML("name"));

			QString strType = QString::fromStdWString(strID);
			if (strType == name)
			{
				xml.RemoveChildElem();
				qDebug() << "delete xml success!";
			}
		}
	}
	xml.Save(FORCEDXML(m_filePath));
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgOperator::editSvg(const QString fileName)
{
	QString name = fileName.mid(fileName.lastIndexOf("/") + 1);
	QByteArray array = readFile(fileName);
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCEDXML(m_filePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		while (xml.FindChildElem(FORCEDXML("Svg")))
		{
			MCD_STR strID = xml.GetChildAttrib(FORCEDXML("name"));

			QString strType = QString::fromStdWString(strID);
			if (strType == name)
			{
				xml.SetChildAttrib(FORCEDXML("Data"), FORCEDXML(array));
			}
		}
	}
	xml.Save(FORCEDXML(m_filePath));
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgOperator::renameSvg(QString oldName, QString newName)
{
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCEDXML(m_filePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		while (xml.FindChildElem(FORCEDXML("Svg")))
		{
			MCD_STR strID = xml.GetChildAttrib(FORCEDXML("name"));

			QString strType = QString::fromStdWString(strID);
			if (strType == oldName)
			{
				xml.SetChildAttrib(FORCEDXML("name"), FORCEDXML(newName));
			}
		}
	}
	xml.Save(FORCEDXML(m_filePath));
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void IcgOperator::readSVG(QStringList &list)
{
	FileManager file("");
	QDir dir;
	QString currentPath = qApp->applicationDirPath();
	;
	file.removeFolder(currentPath + "/temp/");
	dir.mkdir(currentPath + "/temp/");
	CMarkup xml;
	bool bLoadXml = false;
	bool bFind = false;
	bLoadXml = xml.Load(FORCEDXML(m_filePath));
	if (bLoadXml)
	{
		xml.ResetMainPos();
		xml.FindElem();    //UserInfo
		while (xml.FindChildElem(FORCEDXML("Svg")))
		{
			MCD_STR name = xml.GetChildAttrib(FORCEDXML("name"));
			MCD_STR data = xml.GetChildAttrib(FORCEDXML("Data"));
			QString strName = QString::fromStdWString(name);
			QString strData = QString::fromStdWString(data);
			QString path = currentPath + "/temp/" + strName;
			QFile SvgFile(path);
			SvgFile.open(QIODevice::WriteOnly);
			QTextStream textStream(&SvgFile);
			textStream << strData;
			SvgFile.close();
			list.append(path);
		}
	}
	xml.Save(FORCEDXML(m_filePath));
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
QByteArray IcgOperator::readFile(const QString fileName) const
{
	QFile file(fileName);
	file.open(QIODevice::ReadOnly);
	QByteArray array = file.readAll();
	file.close();
	return array;
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
QString IcgOperator::isExistTheSameSvg(const QStringList file) const
{
	return "";
}