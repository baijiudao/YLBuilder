/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  FileManager.cpp
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               �ļ����ļ��й�����
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
* @brief: �ļ�����
* @param[in]:sourceDir-ԭ��ַ
* @param[in]:toDir-Ŀ���ַ
* @param[in]:coverFileIfExist-true���ǣ�false-������
* @return: true-�ɹ���false-ʧ��
*/
bool FileManager::copyFileToPath(QString sourceDir, QString toDir, bool coverFileIfExist)
{
	//TODO �ж����ļ��Ƿ���ҳ�ļ�����ҳ�ļ���css,image��js�ļ���һ������
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
* @brief: �ļ��п���
* @param[in]:fromDir-ԭ��ַ
* @param[in]:toDir-Ŀ�ĵ�ַ
* @param[in]:�Ƿ񸲸�
* @return:true-�ɹ���false-ʧ��
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
		//���Ŀ��Ŀ¼�����ڣ�����д���
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
			//��ΪĿ¼ʱ���ݹ�Ľ���copy
			if (!copyDirectoryFiles(fileInfo.filePath(),
				targetDir.filePath(fileInfo.fileName()),
				coverFileIfExist, list))
			{
				return false;
			}
		}
		else
		{
			//�������ǲ���ʱ�������ļ�����ɾ������ 
			if (coverFileIfExist && targetDir.exists(fileInfo.fileName()))
			{
				targetDir.remove(fileInfo.fileName());
			}
			//�����ļ�copy  
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
* @brief: ɨ���ļ����������ļ�
* @param[in]:folderPath
* @param[in]:selectFolder
* @param[in]:list
* @return:true-�ɹ���false-ʧ��
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
 * @brief:ɾ���ļ��к��ļ����������ļ�        
 * @param[in]:  �ļ���·��
 * @return:true-�ɹ���false-ʧ��
 */
bool  FileManager::removeFolder(const QString &folderFullPath)
{
	//codereview ɾ���ļ����Ƿ���ֱ������
	QDir             dir(folderFullPath);
	QFileInfoList    fileList;
	QFileInfo        curFile;
	QFileInfoList    fileListTemp;
	qint32            infoNum;
	qint32            i;
	qint32            j;
	/* ���Ȼ�ȡĿ���ļ����������ļ����ļ�����Ϣ */
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
			if (curFile.isFile()) /* ������ļ���ɾ���ļ� */
			{
				QFile fileTemp(curFile.filePath());
				fileTemp.remove();
				fileList.removeAt(i);
			}

			if (curFile.isDir()) /* ������ļ��� */
			{
				QDir dirTemp(curFile.filePath());
				fileListTemp = dirTemp.entryInfoList(QDir::Dirs | QDir::Files
					| QDir::Readable | QDir::Writable
					| QDir::Hidden | QDir::NoDotAndDotDot
					, QDir::Name);
				// �²�û���ļ����ļ��� ��ֱ��ɾ��
				if (fileListTemp.size() == 0)
				{
					dirTemp.rmdir(".");
					fileList.removeAt(i);
				}
				else
				{
					// �²����ļ��л��ļ� ����Ϣ��ӵ��б�
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
 * @brief: �����ļ���     
 * @param[in]: �ļ���·��
 */
bool FileManager::createFolder(const QString &path)
{
	QDir targetDir(path);
	if (!targetDir.exists())
	{
		//���Ŀ��Ŀ¼�����ڣ�����д���
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
 * @brief: ������ҳ�ļ�      
 * @param[in]:  ��ҳ�ļ���ַ
 * @return:�Ƿ�ɹ�
 */
bool FileManager::createFile(const QString &path)
{
	//TODO �ж����ļ��Ƿ���ҳ�ļ�����ҳ�ļ���css,image��js�ļ���һ������
	addSuportFolder(path.mid(0, path.lastIndexOf("/")));

	QString fileName = path.mid(path.lastIndexOf("/") + 1);
	QDir dir;
	QString str1 = qApp->applicationDirPath() +"/data/WebControl/WebPage.html";
	QFile::copy(str1, path);
	return true;
}

/**        
 * @brief: ɾ���ļ�        
 * @param[in]: fileFullPath-�ļ�·��
 * @return:true-�ɹ���false-ʧ��
 */
bool FileManager::removeFile(const QString &fileFullPath)
{
	 return QFile::remove(fileFullPath);
}

/**        
 * @brief: ɾ���ļ����ļ���
 * @param[in]:  filePath-Ҫɾ�����ļ����ļ���·��
 * @return: true-�ɹ���false-ʧ��
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
 * @brief:  ������      
 * @param[in]: oldName-������ 
 * @param[in]: newName-������ 
 * @return:�ɹ�-TRUE��ʧ��-false
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