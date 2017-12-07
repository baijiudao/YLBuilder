/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  FileManager.cpp
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
#include "FileManager.h"
#include <QDir>
#include <QDebug>
#include <QApplication>
FileManager::FileManager(QString folderPath, QObject *parent)
	: QObject(parent)
	, m_folderPath(folderPath)
{
}

FileManager::~FileManager()
{
}
/**
* @brief: 文件拷贝
* @param[in]:sourceDir-原地址
* @param[in]:toDir-目标地址
* @param[in]:coverFileIfExist-true覆盖，false-不覆盖
* @return: true-成功，false-失败
*/
bool FileManager::copyFileToPath(QString sourceDir, QString toDir, bool coverFileIfExist)
{
	//TODO 判读此文件是否网页文件，网页文件则将css,image，js文件夹一并拷贝
	toDir.replace("\\", "/");
	if (sourceDir == toDir)
	{
		return true;
	}
	if (!QFile::exists(sourceDir))
	{
		return false;
	}
	QDir *createfile = new QDir;
	bool exist = createfile->exists(toDir);
	if (exist)
	{
		if (coverFileIfExist)
		{
			createfile->remove(toDir);
		}
	}//end if  

	if (!QFile::copy(sourceDir, toDir))
	{
		return false;
	}
	return true;
}

/**
* @brief: 文件夹拷贝
* @param[in]:fromDir-原地址
* @param[in]:toDir-目的地址
* @param[in]:是否覆盖
* @return:true-成功，false-失败
*/
bool FileManager::copyDirectoryFiles(
	const QString &fromDir, 
	const QString &toDir, 
	bool coverFileIfExist, 
	QStringList &list)
{
	QDir sourceDir(fromDir);
	QDir targetDir(toDir);
	if (!targetDir.exists())
	{
		//如果目标目录不存在，则进行创建
		if (!targetDir.mkdir(targetDir.absolutePath()))
		{
			return false;
		}
		else
		{
			list.append(".." + toDir.mid(toDir.indexOf(m_folderPath) + m_folderPath.length()));
		}
	}

	QFileInfoList fileInfoList = sourceDir.entryInfoList();
	foreach(QFileInfo fileInfo, fileInfoList)
	{
		if (fileInfo.fileName() == "." || fileInfo.fileName() == "..")
		{
			continue;
		}

		if (fileInfo.isDir())
		{
			//当为目录时，递归的进行copy
			if (!copyDirectoryFiles(fileInfo.filePath(),
				targetDir.filePath(fileInfo.fileName()),
				coverFileIfExist, list))
			{
				return false;
			}
		}
		else
		{
			//当允许覆盖操作时，将旧文件进行删除操作 
			if (coverFileIfExist && targetDir.exists(fileInfo.fileName()))
			{
				targetDir.remove(fileInfo.fileName());
			}
			//进行文件copy  
			qDebug() << fileInfo.filePath() << "," << targetDir.filePath(fileInfo.fileName());
			if (!QFile::copy(fileInfo.filePath(), targetDir.filePath(fileInfo.fileName())))
			{
				return false;
			}
			else
			{
				QString path = targetDir.filePath(fileInfo.fileName());
				if (path.contains(m_folderPath))
				{
					path = ".." + path.mid(path.indexOf(m_folderPath) + m_folderPath.length());
				}
				list.append(path);
			}
		}
	}
	return true;
}

/**
* @brief: 扫描文件夹下所有文件
* @param[in]:folderPath
* @param[in]:selectFolder
* @param[in]:list
* @return:true-成功，false-失败
*/
bool FileManager::scanAllFile(QString folderPath, const QString &selectFolder, QStringList &list)
{
	QDir sourceDir(folderPath);
	QFileInfoList fileInfoList = sourceDir.entryInfoList();
	foreach(QFileInfo fileInfo, fileInfoList)
	{
		if (fileInfo.fileName() == "." || fileInfo.fileName() == "..")
		{
			continue;
		}
		if (fileInfo.isDir())
		{
			scanAllFile(fileInfo.filePath(), selectFolder, list);
		}
		else
		{
			QString path = sourceDir.filePath(fileInfo.fileName());
			path = ".." + path.mid(selectFolder.lastIndexOf("/"));
			list.append(path);
		}
	}
	return true;
}

/**        
 * @brief:删除文件夹和文件夹下所有文件        
 * @param[in]:  文件夹路径
 * @return:true-成功，false-失败
 */
bool  FileManager::removeFolder(const QString &folderFullPath)
{
	//codereview 删除文件夹是否有直接命令
	QDir             dir(folderFullPath);
	QFileInfoList    fileList;
	QFileInfo        curFile;
	QFileInfoList    fileListTemp;
	qint32            infoNum;
	qint32            i;
	qint32            j;
	/* 首先获取目标文件夹内所有文件及文件夹信息 */
	fileList = dir.entryInfoList(QDir::Dirs | QDir::Files
		| QDir::Readable | QDir::Writable
		| QDir::Hidden | QDir::NoDotAndDotDot
		, QDir::Name);

	while (fileList.size() > 0)
	{
		infoNum = fileList.size();

		for (i = infoNum - 1; i >= 0; i--)
		{
			curFile = fileList[i];
			if (curFile.isFile()) /* 如果是文件，删除文件 */
			{
				QFile fileTemp(curFile.filePath());
				fileTemp.remove();
				fileList.removeAt(i);
			}

			if (curFile.isDir()) /* 如果是文件夹 */
			{
				QDir dirTemp(curFile.filePath());
				fileListTemp = dirTemp.entryInfoList(QDir::Dirs | QDir::Files
					| QDir::Readable | QDir::Writable
					| QDir::Hidden | QDir::NoDotAndDotDot
					, QDir::Name);
				// 下层没有文件或文件夹 则直接删除
				if (fileListTemp.size() == 0)
				{
					dirTemp.rmdir(".");
					fileList.removeAt(i);
				}
				else
				{
					// 下层有文件夹或文件 则将信息添加到列表
					for (j = 0; j < fileListTemp.size(); j++)
					{
						if (!(fileList.contains(fileListTemp[j])))
						{
							fileList.append(fileListTemp[j]);
						}
					}
				}
			}
		}
	}
	dir.rmdir(".");
	return true;
}

/**        
 * @brief: 创建文件夹     
 * @param[in]: 文件夹路径
 */
bool FileManager::createFolder(const QString &path)
{
	QDir targetDir(path);
	if (!targetDir.exists())
	{
		//如果目标目录不存在，则进行创建
		if (!targetDir.mkdir(targetDir.absolutePath()))
		{
			return false;
		}
	}
	else
	{
		return false;
	}
	return true;
}

/**        
 * @brief: 创建网页文件      
 * @param[in]:  网页文件地址
 * @return:是否成功
 */
bool FileManager::createFile(const QString &path)
{
	//TODO 判读此文件是否网页文件，网页文件则将css,image，js文件夹一并拷贝
	addSuportFolder(path.mid(0, path.lastIndexOf("/")));

	QString fileName = path.mid(path.lastIndexOf("/") + 1);
	QDir dir;
	QString str1 = qApp->applicationDirPath() +"/data/WebControl/WebPage.html";
	QFile::copy(str1, path);
	return true;
}

/**        
 * @brief: 删除文件        
 * @param[in]: fileFullPath-文件路径
 * @return:true-成功，false-失败
 */
bool FileManager::removeFile(const QString &fileFullPath)
{
	 return QFile::remove(fileFullPath);
}

/**        
 * @brief: 删除文件或文件夹
 * @param[in]:  filePath-要删除的文件或文件夹路径
 * @return: true-成功，false-失败
 */
bool FileManager::remove(const QString &filePath)
{
	QFileInfo info(filePath);
	if (info.isDir())
	{
		return removeFolder(filePath);
	}
	else
	{
		return removeFile(filePath);
	}
	return false;
}

/**        
 * @brief:  重命名      
 * @param[in]: oldName-旧名称 
 * @param[in]: newName-新名称 
 * @return:成功-TRUE，失败-false
 */
bool FileManager::rename(const QString &oldName, const QString &newName)
{
	return QFile::rename(oldName, newName);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void FileManager::addSuportFolder(QString path)
{
	QDir dir;
	QStringList list;
	QString tempCurrentPath = qApp->applicationDirPath() +"/data/WebControl/";

	dir.setPath(path + "/css");
	if (!dir.exists())
	{
		this->copyDirectoryFiles(tempCurrentPath + "css", path + "/css", false, list);
	}
	dir.setPath(path + "/js");
	if (!dir.exists())
	{
		this->copyDirectoryFiles(tempCurrentPath + "js", path + "/js", false, list);
	}
	dir.setPath(path + "/images");
	if (!dir.exists())
	{
		this->copyDirectoryFiles(tempCurrentPath + "images", path + "/images", false, list);
	}

}