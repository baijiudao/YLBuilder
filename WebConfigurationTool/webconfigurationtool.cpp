#include "webconfigurationtool.h"
#include <QMessageBox>

WebConfigurationTool::WebConfigurationTool(QMainWindow *parent)
{
    pm_parent = parent;
    SetMoudleName(WEBTOOLMOUDLE);
    installListener(this);

    pm_webEditFrame = nullptr;
    pm_picEditFrame = nullptr;
    pm_webFileEditFrame = nullptr;
    pm_picStorEditFrame = nullptr;
    //默认中文
    QString path = qApp->applicationDirPath();
    path = path + "/language/webconfigurationtool_zh";
    m_translator.load(path);
    qApp->installTranslator(&m_translator);

    ShowWebEditForm(parent);
    ShowWebFileEditForm(parent);
    ShowPicStorEditForm(parent);
    ShowPicEditForm(parent);

	if (!pm_webEditFrame->isVisible())
	{
		parent->centralWidget()->hide();
		parent->takeCentralWidget();
		parent->setCentralWidget(pm_webEditFrame);
		pm_webEditFrame->show();
	}
}

WebConfigurationTool::~WebConfigurationTool()
{
    delete pm_webEditFrame;
	pm_webEditFrame = NULL;
	delete pm_webFileEditFrame;
	pm_webFileEditFrame = NULL;
	delete pm_picEditFrame;
	pm_picEditFrame = NULL;
	delete pm_picStorEditFrame;
	pm_picStorEditFrame = NULL;
}

bool WebConfigurationTool::closeWidget()
{
    if (pm_picEditFrame->isChangeOfContent() || pm_picStorEditFrame->isChangeOfContent() || pm_webEditFrame->isChangeOfContent() || pm_webFileEditFrame->isChangeOfContent())
    {
        QMessageBox box(QMessageBox::Warning, qApp->translate(c_sCommon, c_sCommonWarning), qApp->translate(c_sWebConfigurationTool, c_sWebConToolCloseWaring));
        box.setStandardButtons(QMessageBox::Ok | QMessageBox::Cancel);
        box.setButtonText(QMessageBox::Ok, qApp->translate(c_sCommon, c_sCommonOK));
        box.setButtonText(QMessageBox::Cancel, qApp->translate(c_sCommon, c_sCommonCancel));
        int result = box.exec();
        if (QMessageBox::Cancel == result)
        {
            return false;
        }
    }
    return true;
}

void WebConfigurationTool::onMessage(void* pSender, int iMessageType, void* pData)
{
    //也可自写信号槽机制将其转为postMessage
    if (MESSAGE_LANGUAGE_EN == iMessageType)
    {
        qApp->removeTranslator(&m_translator);
        QString path = qApp->applicationDirPath();
        path = path + "/language/webconfigurationtool_en";
        m_translator.load(path);
        qApp->installTranslator(&m_translator);
        return;
    }
    else if (MESSAGE_LANGUAGE_ZH == iMessageType)
    {
        qApp->removeTranslator(&m_translator);
        QString path = qApp->applicationDirPath();
        path = path + "/language/webconfigurationtool_zh";
        m_translator.load(path);
        qApp->installTranslator(&m_translator);
        return;
    }
    else if (OPENWEBEDIT == iMessageType)
    {
        ShowWebEditForm(pm_parent);
    }
    else if (OPENWEBFILEEDIT == iMessageType)
    {
        ShowWebFileEditForm(pm_parent);
    }
    else if (OPENPICSTOREDIT == iMessageType)
    {
        ShowPicStorEditForm(pm_parent);
    }
    else if (OPENPICEDIT == iMessageType)
    {
        ShowPicEditForm(pm_parent);
    }
}

void WebConfigurationTool::ShowWebEditForm(QMainWindow *pmainForm)
{
    if (nullptr == pm_webEditFrame)
    {
        pmainForm->centralWidget()->hide();
        pmainForm->takeCentralWidget();
        pm_webEditFrame = new WebEditFrame(pm_parent);
        pmainForm->setCentralWidget(pm_webEditFrame);
        pm_webEditFrame->show();
    } 
	else if (!pm_webEditFrame->isVisible())
    {
        pmainForm->centralWidget()->hide();
        pmainForm->takeCentralWidget();
        pmainForm->setCentralWidget(pm_webEditFrame);
        pm_webEditFrame->show();
    }
}

void WebConfigurationTool::ShowPicEditForm(QMainWindow *pmainForm)
{
    if (nullptr == pm_picEditFrame)
    {
        pmainForm->centralWidget()->hide();
        pmainForm->takeCentralWidget();
        pm_picEditFrame = new PicEditFrame(pm_parent);
        pmainForm->setCentralWidget(pm_picEditFrame);
        pm_picEditFrame->show();
    } 
	else if (!pm_picEditFrame->isVisible())
    {
        pmainForm->centralWidget()->hide();
        pmainForm->takeCentralWidget();
        pmainForm->setCentralWidget(pm_picEditFrame);
        pm_picEditFrame->show();
    }
}

void WebConfigurationTool::ShowWebFileEditForm(QMainWindow *pmainForm)
{
    if (nullptr == pm_webFileEditFrame)
    {
        pmainForm->centralWidget()->hide();
        pmainForm->takeCentralWidget();
        pm_webFileEditFrame = new WebFileEditFrame(pm_parent);
        pmainForm->setCentralWidget(pm_webFileEditFrame);
        pm_webFileEditFrame->show();
    }
    else if (!pm_webFileEditFrame->isVisible())
    {
        pmainForm->centralWidget()->hide();
        pmainForm->takeCentralWidget();
        pmainForm->setCentralWidget(pm_webFileEditFrame);
        pm_webFileEditFrame->show();
    }
}

void WebConfigurationTool::ShowPicStorEditForm(QMainWindow *pmainForm)
{
    if (nullptr == pm_picStorEditFrame)
    {
        pmainForm->centralWidget()->hide();
        pmainForm->takeCentralWidget();
        pm_picStorEditFrame = new PicStorEditFrame(pm_parent);
        pmainForm->setCentralWidget(pm_picStorEditFrame);
        pm_picStorEditFrame->show();
    }
    else if (!pm_picStorEditFrame->isVisible())
    {
        pmainForm->centralWidget()->hide();
        pmainForm->takeCentralWidget();
        pmainForm->setCentralWidget(pm_picStorEditFrame);
        pm_picStorEditFrame->show();
    }
}