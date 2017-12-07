/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  ContentOperator.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               图库文件操作类头文件包括文件头和索引表的类定义
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/6/6
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once
#include <QObject>
#include<QDataStream>

struct CONTENT_INDEX_TABLE
{
	QString fileName;
	int     contentOffsetInFile;
	int     fileLength;
	int     reserved;
};
class FileHead
{
public:
	FileHead()
		:m_magic(0),
		m_version(0),
		m_indexTableOffsetInFile(16),
		m_reserved(0)
	{};

	friend QDataStream      &operator<<(QDataStream &stream, const FileHead &filehead);
	friend QDataStream      &operator>>(QDataStream &stream, FileHead &filehead);

	quint32                 m_magic;
	quint32                 m_version;
	quint32                 m_indexTableOffsetInFile;
	quint32                 m_reserved;
};

class IndexTable
{
public:
	IndexTable()
	{
		m_aIndexTableList.clear();
		m_indexCount = 0;
	}
	~IndexTable()
	{
		m_aIndexTableList.clear();
	}
	friend QDataStream      &operator<<(QDataStream &stream, const IndexTable &indextable);
	friend QDataStream      &operator>>(QDataStream &stream, IndexTable &indextable);

	quint32                         m_indexCount;
	QList<CONTENT_INDEX_TABLE> m_aIndexTableList;
};

class ContentOperator : public QObject
{
	Q_OBJECT

public:
	ContentOperator(QObject *parent = 0);
	~ContentOperator();

	inline void setFilePath(const QString filepath)
	{
		m_filePath = filepath;
	}

private:
	
	/**        
	 * @brief: 更新文件头       
	 */
	void updataHead();
    
	/**
	 * @brief:新建图库文件
	 * @param[in]:filePath
	 * @return:
	 */
	void create(const QString fileName);

	/**
	 * @brief: 读取图库文件基本信息
	 */
	void readFile();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void addSVG(const QString filePath);

	/**
	 * @brief: 不允许名称一样的svg添加到同一个图库
	 * @param[in]:  list
	 */
	void readSVG(QStringList &list);

	/**        
	 * @brief: 编辑图库中文件       
	 */
	void saveSVG(QString filePath);

	/**        
	 * @brief: 删除图库中文件
	 */
	void removeSVG(QString filePath);

	/**
	* @brief:  重命名文件名称
	* @param[in]:  oldName
	* @param[in]:  newName
	*/
	void updataTabelIndex(const QString oldName, const QString newName);
private:
	QDataStream             m_outStream;
	QDataStream             m_inStream;
	class FileHead          m_fileHead;
	class IndexTable        m_indexTable;
	QString                 m_filePath;

	friend class IcgFileManager;
	friend class PictureStorageWidget;
};
