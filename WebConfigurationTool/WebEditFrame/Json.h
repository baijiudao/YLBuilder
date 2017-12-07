/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  Json.h
** Latest Version:             V1.0.0
** Latest modified Date:       
** Modified by:                
** Descriptions:               
**
**--------------------------------------------------------------------------------------------------------
** Created by:                 Jiang XiaoFei
** Created date:               2017/9/25
** Descriptions:               END
** 
*********************************************************************************************************/
#pragma once

#include <QObject>
#include "Include.h"
#include <QJsonArray>
class Json : public QObject
{
	Q_OBJECT

public:
	Json(QObject *parent =0);
	~Json();

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void readCameraInfo(const QString &json, QList<CAMERA_CONFIG_DATA_S> &data);
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QByteArray addOneCameraInfo(QJsonArray &array, const CAMERA_CONFIG_DATA_S &data) const;

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QByteArray deleteOneCameraInfo(QJsonArray &array, const CAMERA_CONFIG_DATA_S &data) const;

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QByteArray editOneCameraInfo(QJsonArray &array, const CAMERA_CONFIG_DATA_S &data) const;

	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	QJsonArray readJsonArray(QByteArray array);
	
};
