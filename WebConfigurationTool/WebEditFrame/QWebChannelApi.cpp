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
 * @brief: 提供给前端的调用接口，添加控件时调用
 * @param[in]: strTense-create:新创建的控件，before:控件以前的状态
 （如拖动前，或属性更改前）affter:控件修改后的状态，（如拖到一个新地址，
   属相更改后so on.）
 * @param[in]:strLog-控件信息
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
 * @brief: 撤销修改
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
	//判断向量最后一个元素是否是新添加的控件
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
 * @brief: 恢复修改
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
	//说明：本来发送的是ALL,但是在WebEditFrame模块中消息进入了两次，
	//打开了两次选择路径对话框，需要研究暂时如下处理
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
