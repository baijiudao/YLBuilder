/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  FileManager.h
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
	 * @brief: �ļ�����
	 * @param[in]:sourceDir-ԭ��ַ
	 * @param[in]:toDir-Ŀ���ַ
	 * @param[in]:coverFileIfExist-true���ǣ�false-������
	 * @return: true-�ɹ���false-ʧ��
	 */
	bool copyFileToPath(QString sourceDir, QString toDir, bool coverFileIfExist);

	/**
	 * @brief: �ļ��п���
	 * @param[in]:fromDir-ԭ��ַ
	 * @param[in]:toDir-Ŀ�ĵ�ַ
	 * @param[in]:�Ƿ񸲸�
	 * @return:true-�ɹ���false-ʧ��
	 */
	bool copyDirectoryFiles(const QString &fromDir, const QString &toDir, 
		bool coverFileIfExist, QStringList &list);

	/**
	 * @brief: ɨ���ļ����������ļ�
	 * @param[in]:folderPath
	 * @param[in]:selectFolder
	 * @param[in]:list
	 * @return:true-�ɹ���false-ʧ��
	 */
	bool scanAllFile(QString folderPath, const QString &selectFolder, QStringList &list);

	/**
	 * @brief:ɾ���ļ��к��ļ����������ļ�
	 * @param[in]:  �ļ���·��
	 * @return:true-�ɹ���false-ʧ��
	 */
	bool removeFolder(const QString &folderFullPath);

	/**
	 * @brief: ɾ���ļ�
	 * @param[in]: fileFullPath-�ļ�·��
	 * @return:true-�ɹ���false-ʧ��
	 */
	bool removeFile(const QString &fileFullPath);

	/**
	 * @brief: �����ļ���
	 * @param[in]: �ļ���·��
	 */
	bool createFolder(const QString &path);

	/**
	 * @brief: ������ҳ�ļ�
	 * @param[in]:  ��ҳ�ļ���ַ
	 * @return:�Ƿ�ɹ�
	 */
	bool createFile(const QString &path);
	
	/**
	 * @brief: ɾ���ļ����ļ���
	 * @param[in]:  filePath-Ҫɾ�����ļ����ļ���·��
	 * @return: true-�ɹ���false-ʧ��
	 */
	bool remove(const QString &filePath);

	/**
	 * @brief:  ������
	 * @param[in]: oldName-������
	 * @param[in]: newName-������
	 * @return:�ɹ�-TRUE��ʧ��-false
	 */
	bool rename(const QString &oldName, const QString &newName);

	/**        
	 * @brief: ����ǰ��֧���ļ��е�ָ��Ŀ¼   
	 * @param[in]: QString
	 * @return:
	 */
	void addSuportFolder(QString path);

private:
	QString  m_folderPath;
};
