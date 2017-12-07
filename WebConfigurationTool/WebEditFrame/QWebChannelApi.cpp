#include "QWebChannelApi.h"
#include <QFileDialog>
#include <QDebug>
#include "IcgPreviewDialog.h"
QWebChannelApi::QWebChannelApi(QObject *parent)
	: QObject(parent)
	, m_undoBtnState(false)
	, m_redoBtnState(false)
	, m_relativePath("")
{
	m_vecUndoLog.reserve(21);
	m_vecRedoLog.reserve(21);
}

QWebChannelApi::~QWebChannelApi()
{
	m_vecUndoLog.clear();
	m_vecRedoLog.clear();
}

/**        
 * @brief: �ṩ��ǰ�˵ĵ��ýӿڣ���ӿؼ�ʱ����
 * @param[in]: strTense-create:�´����Ŀؼ���before:�ؼ���ǰ��״̬
 �����϶�ǰ�������Ը���ǰ��affter:�ؼ��޸ĺ��״̬�������ϵ�һ���µ�ַ��
   ������ĺ�so on.��
 * @param[in]:strLog-�ؼ���Ϣ
 */
void QWebChannelApi::addLog(QString strTense, QString strLog)
{
	m_vecRedoLog.clear();
	bool *bTmp = new bool(false);
//	this->sendMessage(WEBEDITFRAME, this, WEBMESSAGE_SETREDOENABLE, bTmp);

	m_redoBtnState = false;
	if ("before" == strTense)
	{
		if (m_vecUndoLog.count() >= 20)
		{
			m_vecUndoLog.pop_front();
		}

		if (m_vecUndoLog.count() > 0)
		{
			if (-1 == m_vecUndoLog.last().indexOf("create_"))
			{
				m_vecUndoLog.pop_back();
			}
		}

		m_vecUndoLog.push_back(strLog);
	}
	else if ("after" == strTense)
	{
		m_vecUndoLog.push_back(strLog);
	}

	if ("create" == strTense)
	{
		if (m_vecUndoLog.count() >= 20)
		{
			m_vecUndoLog.pop_front();
		}

		if (m_vecUndoLog.count() > 0)
		{
			if (-1 == m_vecUndoLog.last().indexOf("create_"))
			{
				m_vecUndoLog.pop_back();
			}
		}

		m_vecUndoLog.push_back(strLog);
	}

	*bTmp = true;
	this->sendMessage("ALL", this, WEBMESSAGE_SETUNDOENABLE, bTmp);
	m_undoBtnState = true;
}

void QWebChannelApi::webShortcutUndo()
{
	onUndo();
}

void QWebChannelApi::webShortcutRedo()
{
	onRedo();
}

/**        
 * @brief: �����޸�
 */
void QWebChannelApi::onUndo()
{
	bool *bTmp = new bool(false);
	if (m_vecUndoLog.count() <= 1)
	{
		this->sendMessage("ALL", this, WEBMESSAGE_SETUNDOENABLE, bTmp);
		m_undoBtnState = false;
	}

	if (m_vecUndoLog.count() <= 0)
	{
		return;
	}
	//�ж��������һ��Ԫ���Ƿ�������ӵĿؼ�
	if (-1 == m_vecUndoLog.last().indexOf("create_"))
	{
		m_vecRedoLog.push_back(m_vecUndoLog.last());
		m_vecUndoLog.pop_back();
	}
	else
	{
		if (!m_vecRedoLog.isEmpty() && (m_vecRedoLog.last() == m_vecUndoLog.last()))
		{
			m_vecUndoLog.pop_back();
		}
	}

	if (m_vecUndoLog.isEmpty())
	{
		this->sendMessage("ALL", this, WEBMESSAGE_SETUNDOENABLE, bTmp);
		m_undoBtnState = false;
		return;
	}

	QString strJsCommand = "";
	strJsCommand = m_vecUndoLog.last();
	if (-1 != m_vecUndoLog.last().indexOf("create_"))
	{
		m_vecRedoLog.push_back(m_vecUndoLog.last());
	}
	emit restoreLog("Undo", strJsCommand);

	*bTmp = true;
	this->sendMessage("ALL", this, WEBMESSAGE_SETREDOENABLE, bTmp);
	m_redoBtnState = true;
	return;
}

/**        
 * @brief: �ָ��޸�
 */
void QWebChannelApi::onRedo()
{
	bool *bTmp = new bool(false);
	if (m_vecRedoLog.count() <= 1)
	{
		this->sendMessage("ALL", this, WEBMESSAGE_SETREDOENABLE, bTmp);
		m_redoBtnState = false;
	}

	if (m_vecRedoLog.count() <= 0)
	{
		return;
	}

	if (!m_vecUndoLog.isEmpty() && (m_vecUndoLog.last() != m_vecRedoLog.last()))
	{
		m_vecUndoLog.push_back(m_vecRedoLog.last());
	}
	
	if (m_vecUndoLog.isEmpty())
	{
		m_vecUndoLog.push_back(m_vecRedoLog.last());
	}

	QString strJsCommand = "";
	strJsCommand = m_vecRedoLog.last();
	emit restoreLog("Redo", strJsCommand);

	m_vecRedoLog.pop_back();

	*bTmp = true;
	this->sendMessage("ALL", this, WEBMESSAGE_SETUNDOENABLE, bTmp);
	m_undoBtnState = true;
	return;
}

void QWebChannelApi::clearData()
{
	m_undoBtnState = false;
	m_redoBtnState = false;
	m_vecUndoLog.clear();
	m_vecRedoLog.clear();
}
                        
void QWebChannelApi::getImagePath(QString path)
{
//	path = m_FilePath.mid(0, m_FilePath.lastIndexOf("/")) + path;
	//˵�����������͵���ALL,������WebEditFrameģ������Ϣ���������Σ�
	//��������ѡ��·���Ի�����Ҫ�о���ʱ���´���
	this->sendMessage(WEBEDITFRAME, this, WEBMESSAGE_GETIMAGEPATH, &path);
	this->sendMessage(WEBFILEEDITFRAME, this, WEBMESSAGE_GETIMAGEPATH, &path);
}

/**
* @brief:
* @param[in]:
* @return:
*/
void QWebChannelApi::getSvgPath(QString path)
{
	IcgPreviewDialog *icg = new IcgPreviewDialog("");
	icg->setHtmlPath(m_FilePath, path);
	if (icg->exec() == QDialog::Accepted)
	{
	}
}

void QWebChannelApi::getJsonPath()
{
	emit sigGetJsonpath();
}

void QWebChannelApi::getVideoPath()
{
	emit sigGetVideoPath();
}

void QWebChannelApi::setRelativePath(QString path)
{
	m_relativePath = path;
}

void QWebChannelApi::getPath(QString type)
{
	emit sigGetPath(type);
}
