#pragma once
#include <QObject>
#include <QString>
#include <QVector>
#include "MoudleName.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"

class QWebChannelApi : public QObject, public MessageTransmiter
{
	Q_OBJECT

public:
	QWebChannelApi(QObject *parent);
	~QWebChannelApi();

	inline void setPath(QString path)
	{
		m_FilePath = path;
	}
	void clearData();
	void onUndo();
	void onRedo();
	bool             m_undoBtnState;
	bool             m_redoBtnState;
	QString          m_relativePath;

	QVector<QString> m_vecUndoLog;     //撤销Vector,前端填充
	QVector<QString> m_vecRedoLog;     //重做Vertor， 前端填充

signals:
	//void sendText(const QString &text);
	void restoreLog(const QString &type, const QString &strCommand);
	void sigGetJsonpath();
	void sigGetVideoPath();
	void sigGetPath(QString type);

public slots://WebAPI
	void addLog(QString strTense, QString strLog);
	void getImagePath(QString path);
	void getJsonPath();
	void getVideoPath();
	void setRelativePath(QString path);
	void webShortcutUndo();
	void webShortcutRedo();
	void getPath(QString type);
	
	/**        
	 * @brief:        
	 * @param[in]:  
	 * @return:
	 */
	void getSvgPath(QString path);
private:
	QString   m_FilePath;
};
