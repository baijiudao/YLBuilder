#ifndef YLBUILDERMAINWINDOW_H
#define YLBUILDERMAINWINDOW_H

#include "MoudleName.h"
#include <QMap>
#include <QtWidgets/QMainWindow>
#include <QTranslator>
#include <QRadioButton>
#include <QButtonGroup>
#include <QCheckBox>
//#include <QApplication>
#include <QDesktopWidget>
#include <QSettings>
#include <QDebug>
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"
#include "..\Common\include\WorkspaceWidget.h"
#include "ribbonwindow.h"
#include "..\WebConfigurationTool\webconfigurationtool.h"

static const char *c_sMainFrame = "YLBuilderMainFrame";
static const char *c_sMainFrameTitle = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Title");
//static const char *c_sMainFrameLanguage = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "SwitchLanguage");
static const char *c_sMainFrameLanguage_en = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Language_en");
static const char *c_sMainFrameLanguage_zh = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Language_zh");
static const char *c_sMainFrameTools = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Tools");
static const char *c_sMainFrameOption = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Option");
static const char *c_sMainFrameGroupWebCfgTool = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "WebCfgTool");
static const char *c_sMainFrameGroupLanguage = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Language");
static const char *c_sMainFrameGroupView = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "View");
static const char *c_sMainFrameActionPicEdit = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "PicEdit");
static const char *c_sMainFrameActionWebEdit = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "WebEdit");
static const char *c_sMainFrameStatusBar = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "StatusBar");

class YLBuilderMainWindow : public RibbonWindow, public MessageTransmiter
{
    Q_OBJECT

public:
    YLBuilderMainWindow(QWidget *parent = 0);
    virtual ~YLBuilderMainWindow();

private:

private:
    //void createBackstage();
    void createQuickAccessBar();
    void createRibbon();

protected Q_SLOTS:
    void onRadioLanguageChange();
    void hideStatusBar(int state);

    void closeEvent(QCloseEvent *event);

protected:
    Qtitan::RibbonStyle* m_ribbonStyle;
    QTranslator m_translator;
    WebConfigurationTool* m_pwebConfigurationTool;
    QButtonGroup *m_btnGroupLanguage;

    bool isClickWeb;

protected:
    void changeEvent(QEvent *evt);
    void retranslate();
    virtual bool eventFilter(QObject *watched, QEvent *event);

private:
    WorkspaceWidget m_centralWidget;
    /*QMap<QString, Qtitan::RibbonPage*> m_ribbonPageMap;
    QMap<QString, Qtitan::RibbonGroup*> m_ribbonGroupMap;
    QMap<QString, QAction*> m_actionsMap;
    QMap<QString, QAbstractButton*> m_abstractButtonsMap;*/

public:
    QMainWindow* getCentralWidget();
};

#endif // YLBUILDERMAINWINDOW_H
