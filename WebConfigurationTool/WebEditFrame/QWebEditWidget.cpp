#include "QWebEditWidget.h"

QWebEditWidget::QWebEditWidget(QString filePath, QWidget *parent)
    : QWidget(parent)
	, m_filePath(filePath)
{
    setWindowFlags(Qt::SubWindow);
    m_pWebEditView = new QWebEngineEditView(this);
}

QWebEditWidget::~QWebEditWidget()
{
}

void QWebEditWidget::resizeEvent(QResizeEvent *event)
{
    QWidget::resizeEvent(event);

    m_pWebEditView->resize(this->size().width() - 2, this->size().height() - 1);
    m_pWebEditView->show();
}

bool QWebEditWidget::eventFilter(QObject *watched, QEvent *event)
{
    return QWidget::eventFilter(watched, event);
}

void QWebEditWidget::showEvent(QShowEvent *event)
{
//	this->loadUrl(m_filePath);
    QWidget::showEvent(event);
    m_pWebEditView->show();
}

void QWebEditWidget::hideEvent(QHideEvent *event)
{
    QWidget::hideEvent(event);
    m_pWebEditView->hide();
}

void QWebEditWidget::moveEvent(QMoveEvent *event)
{
    QWidget::moveEvent(event);
}

void QWebEditWidget::setCurrentPath(QString currentPath)
{
	m_strCurrentPath = currentPath;
	loadEditFileNames();
}

void QWebEditWidget::loadUrl(QString filePath)
{
	if (filePath.isEmpty()) return;
	m_filePath = filePath;
	addEditJs(filePath);
	m_pWebEditView->loadUrl(filePath);
}

void QWebEditWidget::quitAndSave(QString filePath, int state)
{
	if (filePath.isEmpty())
	{
		return;
	}
	m_pWebEditView->quitAndSave(filePath, state);
}

void QWebEditWidget::loadEditFileNames()
{
	m_editJsFiles.clear();
	QString filePath("");
	filePath = m_strCurrentPath + "res/data/editJs.xml";

	CMarkup editJsItems;
	editJsItems.Load(reinterpret_cast<const wchar_t *>(filePath.utf16()));

	QString strNodeName("");
	strNodeName = "EditJsFiles";
	if (editJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16())))
	{
		editJsItems.IntoElem();
		strNodeName = "EditJsFile";
		for (; editJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16()));)
		{
			MCD_STR jsName = editJsItems.GetData();
			QString strJsName = QString::fromStdWString(jsName);
			m_editJsFiles.push_back(strJsName);
		}
	}
}

void QWebEditWidget::addEditJs(QString filePath)
{
	CMarkup headJsItems;
	headJsItems.Load(reinterpret_cast<const wchar_t *>(filePath.utf16()));

	QString strNodeName("");
	strNodeName = "html";
	if (headJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16())))
	{
		headJsItems.IntoElem();
		strNodeName = "head";
		if (headJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16())))
		{
			headJsItems.IntoElem();
		}
		else
		{
			QString strNodeValue(" ");
			headJsItems.AddElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16()), reinterpret_cast<const wchar_t *>(strNodeValue.utf16()));
			headJsItems.IntoElem();
			strNodeName = "script";
			headJsItems.AddElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16()), reinterpret_cast<const wchar_t *>(strNodeValue.utf16()));
			QString strAttrib("src"), strAttribValue("js/jquery-1.12.4.js");
			headJsItems.AddAttrib(reinterpret_cast<const wchar_t *>(strAttrib.utf16()), reinterpret_cast<const wchar_t *>(strAttribValue.utf16()));
		}

		bool hasJS = false;
		bool hasActionJs = false;
		strNodeName = "script";
		QString strAttribName = "src";
		for (; headJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16()));)
		{
			MCD_STR strAttrib = headJsItems.GetAttrib(reinterpret_cast<const wchar_t *>(strAttribName.utf16()));
			QString strAttribValue = QString::fromStdWString(strAttrib);
			if (-1 != strAttribValue.indexOf("js/jquery-1.12.4.js"))//data/res/data
			{
				hasJS = true;
			}
			if (-1 != strAttribValue.indexOf("js/action.js"))//data/res/data
			{
				//TODO 判定不够全面
				hasActionJs = true;
			}
			if (hasJS && hasActionJs)
			{
				break;
			}
		}

		if (!hasJS)
		{
			QString strNodeValue(" ");
			headJsItems.AddElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16()), reinterpret_cast<const wchar_t *>(strNodeValue.utf16()));
			QString strAttrib("src"), strAttribValue("js/jquery-1.12.4.js");
			headJsItems.AddAttrib(reinterpret_cast<const wchar_t *>(strAttrib.utf16()), reinterpret_cast<const wchar_t *>(strAttribValue.utf16()));
		}
		if (!hasActionJs)
		{
			QString strNodeValue(" ");
			headJsItems.AddElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16()), reinterpret_cast<const wchar_t *>(strNodeValue.utf16()));
			QString strAttrib("src"), strAttribValue("js/action.js");
			headJsItems.AddAttrib(reinterpret_cast<const wchar_t *>(strAttrib.utf16()), reinterpret_cast<const wchar_t *>(strAttribValue.utf16()));
			QString strAttrib1("async");
			QString strAttribValue1("async");
			headJsItems.AddAttrib(reinterpret_cast<const wchar_t *>(strAttrib1.utf16()), reinterpret_cast<const wchar_t *>(strAttribValue1.utf16()));
		}
	}
	else
	{
		return;
	}

	headJsItems.Save(reinterpret_cast<const wchar_t *>(filePath.utf16()));

	CMarkup editJsItems;
	editJsItems.Load(reinterpret_cast<const wchar_t *>(filePath.utf16()));

	//QString strNodeName("");
	strNodeName = "html";
	if (editJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16())))
	{
		editJsItems.IntoElem();
		strNodeName = "body";
		if (editJsItems.FindElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16())))
		{
			editJsItems.IntoElem();
		}
		else
		{
			return;
		}
	}
	else
	{
		return;
	}

	strNodeName = "script";
	QString strNodeValue(" ");
	QString strAttrib("src"), strAttribValue("");
	QList<QString>::iterator itor = m_editJsFiles.begin();
	for (; itor != m_editJsFiles.end(); itor++)
	{
		strAttribValue = m_strCurrentPath + "res/data/" + *itor;
		editJsItems.AddElem(reinterpret_cast<const wchar_t *>(strNodeName.utf16()), reinterpret_cast<const wchar_t *>(strNodeValue.utf16()));
		editJsItems.AddAttrib(reinterpret_cast<const wchar_t *>(strAttrib.utf16()), reinterpret_cast<const wchar_t *>(strAttribValue.utf16()));
	}
	
	editJsItems.Save(reinterpret_cast<const wchar_t *>(filePath.utf16()));
}
