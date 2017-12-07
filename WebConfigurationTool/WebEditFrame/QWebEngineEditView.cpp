#include "QWebEngineEditView.h"
#include <QDebug>
#include <iostream>
QWebEngineEditView::QWebEngineEditView(QWidget *parent)
    : QWebEngineView(parent)
	, m_pWebChannelApi(NULL)
	, m_strCurrentFilePath("")
	, m_saveState(true)
{
    hide();
    //installEventFilter(this);
    setAcceptDrops(false);
	//模块名称被写死
    SetMoudleName(WEBENGINEEDITVIEW);
    installListener(this);
	setAcceptDrops(true);
	m_pWebChannelApi = new QWebChannelApi(parent);
	connect(m_pWebChannelApi, &QWebChannelApi::sigGetJsonpath, this, &QWebEngineEditView::getJsonPath);
	connect(m_pWebChannelApi, &QWebChannelApi::sigGetVideoPath, this, &QWebEngineEditView::getVideoSavePath);
	connect(this, &QWebEngineView::loadFinished, this, &QWebEngineEditView::loadUrlFinished);
	connect(m_pWebChannelApi, &QWebChannelApi::sigGetPath, this, &QWebEngineEditView::getPath);
	//this->page()->runJavaScript("getRelativePath()");
}

QWebEngineEditView::~QWebEngineEditView()
{
	QWebChannel *channel = page()->webChannel();
	if (nullptr != channel)
	{
		delete channel;
		channel = nullptr;
	}
	delete m_pWebChannelApi;
	m_pWebChannelApi = NULL;
}

void QWebEngineEditView::showEvent(QShowEvent *event)
{
	//this->page()->runJavaScript("setWebEditMode('enable')");
    QWebEngineView::showEvent(event);
}

void QWebEngineEditView::dragEnterEvent(QDragEnterEvent *event)
{
	QWebEngineView::dragEnterEvent(event);
    QStringList tmpList = event->mimeData()->formats();
    if (tmpList.size() != 0)
    {
        QString strData = tmpList.first();
        if (strData.contains("addWebControl/", Qt::CaseInsensitive))
		{
			qDebug() << "dragEnterEvent2";
			event->setDropAction(Qt::MoveAction);
            event->accept();
        }
    }
	if (event->mimeData()->hasFormat("image_insert_svg"))
	{
		event->setDropAction(Qt::MoveAction);
		event->accept();
	}
}

void QWebEngineEditView::dragMoveEvent(QDragMoveEvent *event)
{
	qDebug() << "dragMoveEvent 0"; 
	QWebEngineView::dragMoveEvent(event);
	qDebug() << "dragMoveEvent 01:";
    QStringList tmpList = event->mimeData()->formats();
	qDebug() << "dragMoveEvent 110:" << tmpList.size();
    if (tmpList.size() != 0)
    {
        QString strData = tmpList.first();
		qDebug() << "dragMoveEvent 12:" << strData;
        if (strData.contains("addWebControl/", Qt::CaseInsensitive))
        {
			qDebug() << "dragMoveEvent 20" << event->dropAction() << ";" << Qt::MoveAction;
			event->setDropAction(event->dropAction());
			//event->setDropAction(Qt::MoveAction);
            event->accept();
        }
    }
	else
	{
		event->ignore();
	}

	if (event->mimeData()->hasFormat("image_insert_svg"))
	{
		event->setDropAction(event->dropAction());
		event->accept();
	}
}

void QWebEngineEditView::dropEvent(QDropEvent *event)
{
    QWebEngineView::dropEvent(event);
	qDebug() << "dropEvent 1";
    QStringList tmpList = event->mimeData()->formats();
    if (tmpList.size() != 0)
    {
        QString strData = tmpList.first();
        if (strData.contains("addWebControl/", Qt::CaseInsensitive))
        {
            QString strType = strData.mid(strData.indexOf("/") + 1, strData.length());
            QString strAddControl = "";
            strAddControl.sprintf("addControl('%s', %d, %d);", 
				strType.toLatin1().data(), event->pos().rx(), event->pos().ry());
            this->page()->runJavaScript(strAddControl);
			QList<QWebEngineScript> list = this->page()->scripts().toList();
			qDebug() << "dropEvent 2";
        }
    }
	if (event->mimeData()->hasFormat("image_insert_svg"))
	{
		QByteArray pieceData = event->mimeData()->data("image_insert_svg");
		QDataStream stream(&pieceData, QIODevice::ReadOnly);

		QString path;
		stream >> path;
		
		QString file = this->m_strCurrentFilePath;
		QString relativePath = this->m_pWebChannelApi->m_relativePath
			+ "/" + path.mid(path.lastIndexOf("/") + 1);

		QString imagePath = file.mid(0, file.lastIndexOf("/") + 1) + relativePath;

		QFile::copy(path, imagePath);

		QString cmd = "setCanvasPic('" + relativePath + "')";
		this->page()->runJavaScript(cmd);
	}
}

void QWebEngineEditView::contextMenuEvent(QContextMenuEvent *event)
{
    //QWebEngineView::contextMenuEvent(event);
}

bool QWebEngineEditView::eventFilter(QObject *watched, QEvent *event)
{
    qDebug() << event->type();
    return QWidget::eventFilter(watched, event);
}

void QWebEngineEditView::onMessage(void* pSender, int iMessageType, void* pData)
{
	//只响应当前页
    if (ENABLEDRAG == iMessageType)
    {
        setAcceptDrops(true);
        return;
    }

    if (DISABLEDRAG == iMessageType)
    {
        setAcceptDrops(false);
        return;
    }

	if (WEBMESSAGE_SETWEBTITLE == iMessageType)
	{
		this->page()->runJavaScript("document.title", [this](const QVariant &result){
			setWebTitle(result.toString());
			});
		return;
	}

 	if (WEBMESSAGE_SETWEBSIZE == iMessageType)
 	{
 		this->page()->runJavaScript("getCanvasSise()", [this](const QVariant &result){
 			setWebSize(result.toString());
 		});
 		return;
 	}

 	if (WEBMESSAGE_UNDO == iMessageType)
 	{
 		m_pWebChannelApi->onUndo();
 		//onUndo();
 		return;
 	}
 
 	if (WEBMESSAGE_REDO == iMessageType)
 	{
 		m_pWebChannelApi->onRedo();
 		//onRedo();
 		return;
 	}
	if (WEBMESSAGE_SENDSVGPATH == iMessageType)
   {
	   QString path = *static_cast<QString*>(pData);
	   QString cmd = "setPictrue('" + path + "')";
	   this->page()->runJavaScript(cmd);
   }

}

void QWebEngineEditView::setWebTitle(QString strCurrentTitle)
{
	QSetWebTitleDlg *pDlg = new QSetWebTitleDlg(this);
	pDlg->setCurrentWebTitle(strCurrentTitle);
	if (QDialog::Accepted  == pDlg->exec())
	{
		QString strNewTitle = pDlg->getWebTitle();
		QString strJsCommand = "";
		
		strJsCommand = "setWebTitle('" + strNewTitle + "')";

		this->page()->runJavaScript(strJsCommand);
	}

	delete pDlg;
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QWebEngineEditView::setWebSize(QString strSize)
{
	QSetCanvasSizeDlg *pDlg = new QSetCanvasSizeDlg(this);
	pDlg->setCurrentWebSize(strSize);
	if (QDialog::Accepted == pDlg->exec())
	{
		QString strNewWidth = pDlg->getWebWidth();
		QString strNewHeight = pDlg->getWebHeight();
 		QString strJsCommand = "";
		strJsCommand.sprintf("setCanvasSise(%s,%s)", 
			strNewWidth.toLatin1().data(), strNewHeight.toLatin1().data());
 
 		this->page()->runJavaScript(strJsCommand);
	}

	delete pDlg;
}

//void QWebEngineEditView::selectAll()
//{
//	this->page()->runJavaScript("setSelectAll()");
//}

void QWebEngineEditView::loadUrlFinished()
{
	if ("" == m_strCurrentFilePath)
	{
		if (this->parentWidget()->parentWidget()->parentWidget())
		{
			this->parentWidget()->parentWidget()->parentWidget()->setEnabled(false);
		}
		return;
	}
	removeEditJs(m_strCurrentFilePath);
	this->page()->runJavaScript("setWebEditMode('enable')");
	if (this->parentWidget()->parentWidget()->parentWidget())
	{
		this->parentWidget()->parentWidget()->parentWidget()->setEnabled(true);
	}

	this->sendMessage(WEBEDITFRAME, this, WEBEDITPAGEENABLE);

	m_pWebChannelApi->clearData();

	this->page()->runJavaScript("getRelativePath()");
}

void QWebEngineEditView::quitAndSave(QString filePath, int state)
{
	//f非阻塞通信
	m_saveState = false;
	this->page()->runJavaScript("setWebEditMode('disable')");
	this->page()->toHtml([this, state](const QString &result){
		if (!result.isEmpty())
		{
			QFile file;
			file.setFileName(m_strCurrentFilePath);
			file.remove(m_strCurrentFilePath);
			bool ok = file.open(QIODevice::ReadWrite);
			if (ok) 
			{
				QTextStream out(&file);
				out.setCodec("UTF-8");
				out << result;
				out.flush();
				file.close();
			}
			removeEditJs(m_strCurrentFilePath);
			qDebug() << result;
			emit saveWeb();
			m_saveState = true;
		}
	});

//	this->page()->runJavaScript("setWebEditMode('disable')");
}

void QWebEngineEditView::loadUrl(QString filePath)
{
	m_strCurrentFilePath = filePath;
	m_pWebChannelApi->setPath(filePath);
	QWebChannel *channel = page()->webChannel();
	if (nullptr == channel)
	{
		channel = new QWebChannel(page());
		channel->registerObject(QStringLiteral("webedit"), m_pWebChannelApi);

		page()->setWebChannel(channel);
	}

	this->page()->load(QUrl(m_strCurrentFilePath));
}

void QWebEngineEditView::removeEditJs(QString filePath)
{
	CMarkup removeEditJsItems;
	removeEditJsItems.Load(reinterpret_cast<const wchar_t *>(filePath.utf16()));

	QString strNodeName("");
	strNodeName = "html";
	if (removeEditJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16())))
	{
		removeEditJsItems.IntoElem();
		strNodeName = "body";
		if (removeEditJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16())))
		{
			removeEditJsItems.IntoElem();
			strNodeName = "script";
			QString strAttribName = "src", strEditJsMark = "";
			for (; removeEditJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16()));)
			{
				MCD_STR strAttrib = removeEditJsItems.GetAttrib(reinterpret_cast<const wchar_t *>(strAttribName.utf16()));
				strEditJsMark = QString::fromStdWString(strAttrib);
				if (-1 != strEditJsMark.indexOf("data/res/data"))//data/res/data
				{
					removeEditJsItems.RemoveElem();
				}
			}
			removeEditJsItems.Save(reinterpret_cast<const wchar_t *>(filePath.utf16()));
		}
	}
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QWebEngineEditView::runJavaScript(const QString cmd)
{
	this->page()->runJavaScript(cmd);
	return;
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QWebEngineEditView::setEnableModel(bool state)
{
	if (state)
	{
		this->page()->runJavaScript("setWebEditMode('enable')");
	}
	else
	{
		this->page()->runJavaScript("setWebEditMode('disable')");
	}
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QWebEngineEditView::getImageFile(QString file)
{
	QWidget widget;
	QString newPath = QFileDialog::getOpenFileName(&widget, tr(""),
		"C:/", IMAGE_TYPE);

	if (newPath.isEmpty())
	{
		return;
	}
	QString name = newPath.mid(newPath.lastIndexOf("/") + 1);
	QString path = m_strCurrentFilePath.mid(0, m_strCurrentFilePath.lastIndexOf("/") + 1) + file + name;
	QFile::copy(newPath, path);
	file = file + name;
	QString cmd = "setImage('" + file + "')";
	this->page()->runJavaScript(cmd);
}

/**        
 * @brief:获取json文件信息      
 */
void QWebEngineEditView::getJsonPath()
{
	QWidget widget;
	QString newPath = QFileDialog::getOpenFileName(&widget, tr(""),
		"C:/", "JSON(*.json)");

	if (newPath.isEmpty())
	{
		return;
	}
	QFile file(newPath);
	file.open(QIODevice::ReadOnly);
	QByteArray array = file.readAll();
	file.close();
	QString str(array);
	qDebug() << str;
	QString cmd = "setJsonInfo('" + newPath + "'," + "'" + str + "')";
	//QString cmd = QString("setJsonInfo(\"%1\", \"%2\")").arg(newPath).arg(str);
	this->page()->runJavaScript(cmd);
}

/**
* @brief:获取json文件信息
*/
void QWebEngineEditView::getVideoSavePath()
{	//codereview 测试一下中文路径
	QString newPath = QFileDialog::getExistingDirectory(NULL, "",
		"C:/", QFileDialog::ShowDirsOnly);
	if (newPath.isEmpty())
	{
		return;
	}
	QString cmd = "setVideoPath('" + newPath + "')";
	this->page()->runJavaScript(cmd);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QWebEngineEditView::getPath(QString type)
{
	QWidget widget;
	QString path = m_strCurrentFilePath.mid(0, m_strCurrentFilePath.lastIndexOf("/"));
	QString newPath = QFileDialog::getOpenFileName(&widget, tr(""),
		path, type + "(*." + type + ")");

	if (newPath.isEmpty())
	{
		return;
	}
	if (!newPath.contains(path))
	{
		QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCreateProjectDlg, c_sWarning),
			qApp->translate(c_sWEFrame, c_sScenceAddHtmlError)
			);
		box.setStandardButtons(QMessageBox::Ok);
		box.setButtonText(QMessageBox::Ok, qApp->translate(c_sBaseFrame, c_sOK));
		box.exec();
		return;
	}
	QString relativePath = newPath.mid(path.length() + 1);
	QString cmd = "setPath('" + relativePath + "')";
	this->page()->runJavaScript(cmd);
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QWebEngineEditView::setCloseHtml()
{
	this->page()->runJavaScript("closeHtml()");
}

/**        
 * @brief:        
 * @param[in]:  
 * @return:
 */
void QWebEngineEditView::setHtmlSize()
{
	this->page()->runJavaScript("getCanvasSise()", [this](const QVariant &result){
		setWebSize(result.toString());
	});
	return;
}