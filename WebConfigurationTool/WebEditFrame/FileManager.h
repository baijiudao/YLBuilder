/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  FileManager.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               文件和文件夹管理类
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/7/17
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once

#include <QObject>
#include <QDir>

class FileManager : public QObject
{
	Q_OBJECT

public:
	FileManager(QString folderPath, QObject *parent = 0);
	~FileManager();

	/**
	 * @brief: 文件拷贝
	 * @param[in]:sourceDir-原地址
	 * @param[in]:toDir-目标地址
	 * @param[in]:coverFileIfExist-true覆盖，false-不覆盖
	 * @return: true-成功，false-失败
	 */
	bool copyFileToPath(QString sourceDir, QString toDir, bool coverFileIfExist);

	/**
	 * @brief: 文件夹拷贝
	 * @param[in]:fromDir-原地址
	 * @param[in]:toDir-目的地址
	 * @param[in]:是否覆盖
	 * @return:true-成功，false-失败
	 */
	bool copyDirectoryFiles(const QString &fromDir, const QString &toDir, 
		bool coverFileIfExist, QStringList &list);

	/**
	 * @brief: 扫描文件夹下所有文件
	 * @param[in]:folderPath
	 * @param[in]:selectFolder
	 * @param[in]:list
	 * @return:true-成功，false-失败
	 */
	bool scanAllFile(QString folderPath, const QString &selectFolder, QStringList &list);

	/**
	 * @brief:删除文件夹和文件夹下所有文件
	 * @param[in]:  文件夹路径
	 * @return:true-成功，false-失败
	 */
	bool removeFolder(const QString &folderFullPath);

	/**
	 * @brief: 删除文件
	 * @param[in]: fileFullPath-文件路径
	 * @return:true-成功，false-失败
	 */
	bool removeFile(const QString &fileFullPath);

	/**
	 * @brief: 创建文件夹
	 * @param[in]: 文件夹路径
	 */
	bool createFolder(const QString &path);

	/**
	 * @brief: 创建网页文件
	 * @param[in]:  网页文件地址
	 * @return:是否成功
	 */
	bool createFile(const QString &path);
	
	/**
	 * @brief: 删除文件或文件夹
	 * @param[in]:  filePath-要删除的文件或文件夹路径
	 * @return: true-成功，false-失败
	 */
	bool remove(const QString &filePath);

	/**
	 * @brief:  重命名
	 * @param[in]: oldName-旧名称
	 * @param[in]: newName-新名称
	 * @return:成功-TRUE，失败-false
	 */
	bool rename(const QString &oldName, const QString &newName);

	/**        
	 * @brief: 拷贝前端支持文件夹到指定目录   
	 * @param[in]: QString
	 * @return:
	 */
	void addSuportFolder(QString path);

private:
	QString  m_folderPath;
};
