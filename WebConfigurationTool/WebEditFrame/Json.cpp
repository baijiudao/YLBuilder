/****************************************Copyright (c)****************************************************
**
**                                       YiLi Intelligent
**
**--------------File Info---------------------------------------------------------------------------------
** File name:                  Json.cpp
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
#include "Json.h"
#include <QJsonDocument>
#include <QJsonObject>
//#include <QJsonArray>
#include <QApplication>
#include <QFile>
Json::Json(QObject *parent)
	: QObject(parent)
{
}

Json::~Json()
{
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void Json::readCameraInfo(const QString &json, QList<CAMERA_CONFIG_DATA_S> &data)
{
	QJsonArray jsonArray = readJsonArray(json.toUtf8());
	//子系统
	for (int i = 0; i < jsonArray.count(); ++i)
	{
		CAMERA_CONFIG_DATA_S info;
		QJsonValue childValue = jsonArray[i];
		if (childValue.isObject())
		{
			QJsonObject  childObjectDevice = childValue.toObject();
			if (childObjectDevice.contains("Id"))
			{
				QJsonValue valueJson = childObjectDevice.value("Id");
				info.id = valueJson.toInt();
			}
			if (childObjectDevice.contains("URL"))
			{
				QJsonValue valueJson = childObjectDevice.value("URL");
				info.url = valueJson.toString();
			}
			if (childObjectDevice.contains("OutputPort"))
			{
				QJsonValue valueJson = childObjectDevice.value("OutputPort");
				info.outputPort = valueJson.toInt();
			}
			if (childObjectDevice.contains("InputPort"))
			{
				QJsonValue valueJson = childObjectDevice.value("InputPort");
				info.inputPort = valueJson.toInt();
			}
			if (childObjectDevice.contains("VideoWidth"))
			{
				QJsonValue valueJson = childObjectDevice.value("VideoWidth");
				info.videoWidth = valueJson.toInt();
			}
			if (childObjectDevice.contains("VideoHeight"))
			{
				QJsonValue valueJson = childObjectDevice.value("VideoHeight");
				info.videoHeight = valueJson.toInt();
			}
		}
		data.append(info);
	}
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
QByteArray Json::addOneCameraInfo(QJsonArray &array, const CAMERA_CONFIG_DATA_S &data) const
{
	QJsonObject object1;
	QJsonObject object;
	object.insert("Id", data.id);
	object.insert("URL", data.url);
	object.insert("OutputPort", data.outputPort);
	object.insert("InputPort", data.inputPort);
	object.insert("VideoWidth", data.videoWidth);
	object.insert("VideoHeight", data.videoHeight);

	array.append(object);
	object1.insert("Camera", QJsonValue(array));

	QJsonParseError jsonError;
	QJsonDocument SettingsJsonDocument;
	QJsonDocument doucment;
	doucment.setObject(object1); // 转化为 JSON 文档

	return doucment.toJson(QJsonDocument::Compact);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
QByteArray Json::deleteOneCameraInfo(QJsonArray &array, const CAMERA_CONFIG_DATA_S &data) const
{
	for (int i = 0; i < array.count(); ++i)
	{
		CAMERA_CONFIG_DATA_S info;
		QJsonValue childValue = array[i];
		if (childValue.isObject())
		{
			QJsonObject  childObjectDevice = childValue.toObject();
			if (childObjectDevice.contains("Id"))
			{
				QJsonValue valueJson = childObjectDevice.value("Id");
				int id = valueJson.toInt();
				if (id == data.id)
				{
					array.removeAt(i);
				}
			}
		}
	}

	QJsonObject object;
	object.insert("Camera", QJsonValue(array));

	QJsonParseError jsonError;
	QJsonDocument SettingsJsonDocument;
	QJsonDocument doucment;
	doucment.setObject(object); // 转化为 JSON 文档

	return doucment.toJson(QJsonDocument::Compact);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
QByteArray Json::editOneCameraInfo(QJsonArray &array, const CAMERA_CONFIG_DATA_S &data) const
{
	QJsonObject object1;
	QJsonObject object;
	object.insert("Id", data.id);
	object.insert("URL", data.url);
	object.insert("OutputPort", data.outputPort);
	object.insert("InputPort", data.inputPort);
	object.insert("VideoWidth", data.videoWidth);
	object.insert("VideoHeight", data.videoHeight);

	for (int i = 0; i < array.count(); ++i)
	{
		CAMERA_CONFIG_DATA_S info;
		QJsonValue childValue = array[i];
		if (childValue.isObject())
		{
			QJsonObject  childObjectDevice = childValue.toObject();
			if (childObjectDevice.contains("Id"))
			{
				QJsonValue valueJson = childObjectDevice.value("Id");
				int id = valueJson.toInt();
				if (id == data.id)
				{
					array.removeAt(i);
					array.insert(i, object);
				}
			}
		}
	}
	object1.insert("Camera", QJsonValue(array));

	QJsonParseError jsonError;
	QJsonDocument SettingsJsonDocument;
	QJsonDocument doucment;
	doucment.setObject(object1); // 转化为 JSON 文档

	return doucment.toJson(QJsonDocument::Compact);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
QJsonArray Json::readJsonArray(QByteArray array)
{
	QJsonArray jsonArray;
	QJsonParseError jsonError;
	QJsonDocument doucment = QJsonDocument::fromJson(array, &jsonError);  // 转化为 JSON 文档
	if (!doucment.isNull() && (jsonError.error == QJsonParseError::NoError))
	{
		if (doucment.isObject())
		{
			QJsonObject object = doucment.object();

			if (object.contains("Camera"))
			{
				QJsonValue value = object.value("Camera");
				if (value.isArray())
				{
					jsonArray = value.toArray();
					return jsonArray;
				}
			}
		}
	}
	return jsonArray;
}