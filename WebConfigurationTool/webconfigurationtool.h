#ifndef WEBCONFIGURATIONTOOL_H
#define WEBCONFIGURATIONTOOL_H

#include "MoudleName.h"
#include <QApplication>
#include <QtWidgets/QMainWindow>
#include <QTranslator>
#include "webconfigurationtool_global.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"
#include "WebEditFrame\WebEditFrame.h"
#include "PicEditRes\PicEditFrame.h"
#include "WebEditFrame\WebFileEditFrame.h"
#include "PicEditRes\PicStorEditFrame.h"
//#include "..\Common\include\WorkspaceWidget.h"
#include <QtWebEngineWidgets>//Yingjie Debug

static const char *c_sWebConfigurationTool = "WebConfiguraTionTool";
static const char *c_sWebConToolCloseWaring = QT_TRANSLATE_NOOP("WebConfiguraTionTool", "CloseWaring");

class WEBCONFIGURATIONTOOL_EXPORT WebConfigurationTool : public QObject, public MessageTransmiter
{
    Q_OBJECT

public:
    WebConfigurationTool(QMainWindow *parent);
    virtual ~WebConfigurationTool();
    void ShowWebEditForm(QMainWindow *pmainForm);
    void ShowPicEditForm(QMainWindow *pmainForm);
    void ShowWebFileEditForm(QMainWindow *pmainForm);
    void ShowPicStorEditForm(QMainWindow *pmainForm);

    bool closeWidget();

Q_SIGNALS:

public Q_SLOTS:

public:
    virtual void onMessage(void* pSender, int iMessageType, void* pData = NULL);

protected:
    QMainWindow *pm_parent;
    QTranslator m_translator;
    WebEditFrame *pm_webEditFrame;
    //QWebEngineView *pm_webEditFrame;//Yingjie Debug
    WebFileEditFrame *pm_webFileEditFrame;
    PicStorEditFrame *pm_picStorEditFrame;
    PicEditFrame *pm_picEditFrame;

private:

};

#endif // WEBCONFIGURATIONTOOL_H
