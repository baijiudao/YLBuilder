/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  IcgOperator.h
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
#pragma once

#include <QObject>
#include "Markup.h"
#include "./WebEditFrame/FileManager.h"
#if defined(_MSC_VER) && (_MSC_VER >= 1600)  
# pragma execution_character_set("utf-8")  
#endif
class IcgOperator : public QObject
{
	Q_OBJECT

public:
	IcgOperator(QString icgName, QObject *parent = 0);
	~IcgOperator();

	inline void setFilePath(const QString filepath)
	{
		m_filePath = filepath;
	}
	private:
	/** 初始化
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void init();

	/**        
	 * @brief: 新建图库文件    
	 * @param[in]:  
	 * @return:
	 */
	bool makeIcg(QString fileName);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void addSVG(const QString fileName) const;

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void removeSVG(const QString fileName) const;

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void editSvg(const QString fileName);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void renameSvg(QString oldName, QString newName);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void readSVG(QStringList &list);

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QByteArray readFile(const QString fileName) const;

	/**        
	 * @brief:判断是否存在同名文件       
	 * @param[in]:  文件List
	 * @return:返回同名文件
	 */
	QString isExistTheSameSvg(const QStringList file) const;
private:
	QString  m_filePath;
	friend class PictureStorageWidget;
	friend class IcgManagerWidget;
	friend class IcgPreviewDialog;
};
