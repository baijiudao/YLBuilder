#include "ylbuildermainwindow.h"

#include <QtnOfficeDefines.h>
#include <QtnRibbonQuickAccessBar.h>
#include <QtnRibbonBackstageView.h>

YLBuilderMainWindow::YLBuilderMainWindow(QWidget *parent)
    : RibbonWindow(parent)
    , m_ribbonStyle(qobject_cast<Qtitan::RibbonStyle*>(qApp->style()))
{
    SetMoudleName(MAINFRAMEMOUDLE);
    installListener(this);
    isClickWeb = false;

    //installEventFilter(this);
	//setWindowFlags(Qt::FramelessWindowHint);

	Qtitan::RibbonStyle::Theme themeId = OfficeStyle::Office2013Gray;//默认风格
    setOptions(themeId);
    setCentralWidget(&m_centralWidget);//主界面

    m_pwebConfigurationTool = new WebConfigurationTool(this);

    createQuickAccessBar();//快速访问工具栏
    createRibbon();//带状条

    move(QPoint(150, 150));
    QRect geom = QApplication::desktop()->availableGeometry();
    resize(2 * geom.width() / 3, 2 * geom.height() / 3);
    //resize(geom.width() - 300, geom.height() - 300);

    //默认中文
    QString path = qApp->applicationDirPath();
    path = path + "/language/ylbuilder_zh";
    m_translator.load(path);
    qApp->installTranslator(&m_translator);

    statusBar()->setVisible(true);//状态栏
}

YLBuilderMainWindow::~YLBuilderMainWindow()
{
	delete m_pwebConfigurationTool;
}

void YLBuilderMainWindow::closeEvent(QCloseEvent *event)
{
    if (m_pwebConfigurationTool->closeWidget()) 
    {
        RibbonWindow::closeEvent(event);
    }
    else
    {
        event->ignore();
    }
}

QMainWindow* YLBuilderMainWindow::getCentralWidget()
{
    return static_cast<QMainWindow*>(&m_centralWidget);
}

void YLBuilderMainWindow::createRibbon()
{
    //选项
    if (Qtitan::RibbonPage* pageOption = ribbonBar()->addPage(""))
    {
        m_ribbonPageMap.insert(c_sMainFrameOption, pageOption);
        if (Qtitan::RibbonGroup* groupLanguage = pageOption->addGroup(""))
        {
            m_ribbonGroupMap.insert(c_sMainFrameGroupLanguage, groupLanguage);

            QRadioButton* radioLanguage_en = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sMainFrameLanguage_en, radioLanguage_en);
            groupLanguage->addWidget(radioLanguage_en);

            QRadioButton* radioLanguage_zh = new QRadioButton("");
            m_abstractButtonsMap.insert(c_sMainFrameLanguage_zh, radioLanguage_zh);
            groupLanguage->addWidget(radioLanguage_zh);

            m_btnGroupLanguage = new QButtonGroup(this);
            m_btnGroupLanguage->addButton(radioLanguage_en, 0);
            m_btnGroupLanguage->addButton(radioLanguage_zh, 1);
            radioLanguage_zh->setChecked(true);
            connect(radioLanguage_en, &QRadioButton::clicked, this, &YLBuilderMainWindow::onRadioLanguageChange);
            connect(radioLanguage_zh, &QRadioButton::clicked, this, &YLBuilderMainWindow::onRadioLanguageChange);
        }

        if (Qtitan::RibbonGroup* groupView = pageOption->addGroup(""))
        {
            m_ribbonGroupMap.insert(c_sMainFrameGroupView, groupView);

            QCheckBox* checkStatusBar = new QCheckBox("");
            m_abstractButtonsMap.insert(c_sMainFrameStatusBar, checkStatusBar);
            checkStatusBar->setCheckState(Qt::Checked);
            groupView->addWidget(checkStatusBar);
            connect(checkStatusBar, &QCheckBox::stateChanged, this, &YLBuilderMainWindow::hideStatusBar);
        }
    }

    //del by Yingjie for 暂时避免webengineview加载后界面渲染出错
    //ribbonBar()->setFrameThemeEnabled();
}

void YLBuilderMainWindow::onRadioLanguageChange()
{
    int iGroupLanguageCheckedId = m_btnGroupLanguage->checkedId();
    QString path = qApp->applicationDirPath();
    switch (iGroupLanguageCheckedId)
    {
    case 0:
        sendMessage("ALL", this, MESSAGE_LANGUAGE_EN);
        qApp->removeTranslator(&m_translator);
        path = path + "/language/ylbuilder_en";
        m_translator.load(path);
        qApp->installTranslator(&m_translator);
        break;
    case 1:
        sendMessage("ALL", this, MESSAGE_LANGUAGE_ZH);
        qApp->removeTranslator(&m_translator);
        path = path + "/language/ylbuilder_zh";
        m_translator.load(path);
        qApp->installTranslator(&m_translator);
        break;
    default:
        break;
    }
}

void YLBuilderMainWindow::hideStatusBar(int state)
{
    statusBar()->setVisible(state == Qt::Checked);
}

void YLBuilderMainWindow::createQuickAccessBar()
{
    if (Qtitan::RibbonQuickAccessBar* quickAccessBar = ribbonBar()->quickAccessBar())
    {
        QAction* action = quickAccessBar->actionCustomizeButton();
        action->setVisible(false);
        //quickAccessBar->setActionVisible(action, false);
        //action->setToolTip(tr("Customize Quick Access Bar"));

		QAction* smallButton;

		smallButton = quickAccessBar->addAction(QIcon(""), tr(""));
		smallButton->setVisible(false);

        ribbonBar()->showQuickAccess(true);
    }

	ribbonBar()->setTitleBarVisible(false);
}

void YLBuilderMainWindow::changeEvent(QEvent *evt)
{
    switch (evt->type())
    {
    case QEvent::LanguageChange:
        retranslate();
        break;
    default:
        break;
    }
    RibbonWindow::changeEvent(evt);
}

void YLBuilderMainWindow::retranslate()
{
    setWindowTitle(qApp->translate(c_sMainFrame, c_sMainFrameTitle));
    
    QMap<QString, Qtitan::RibbonPage*>::iterator itorRibbonPage = m_ribbonPageMap.begin();
    for (; itorRibbonPage != m_ribbonPageMap.end(); itorRibbonPage++)
    {
        itorRibbonPage.value()->setTitle(qApp->translate(c_sMainFrame, itorRibbonPage.key().toLatin1().data()));
    }

    QMap<QString, Qtitan::RibbonGroup*>::iterator itorRibbonGroup = m_ribbonGroupMap.begin();
    for (; itorRibbonGroup != m_ribbonGroupMap.end(); itorRibbonGroup++)
    {
        itorRibbonGroup.value()->setTitle(qApp->translate(c_sMainFrame, itorRibbonGroup.key().toLatin1().data()));
    }

    QMap<QString, QAction*>::iterator itorActions = m_actionsMap.begin();
    for (; itorActions != m_actionsMap.end(); itorActions++)
    {
        itorActions.value()->setText(qApp->translate(c_sMainFrame, itorActions.key().toLatin1().data()));
    }

	QMap<QString, QMenu*>::iterator itorMenus = m_menusMap.begin();
	for (; itorMenus != m_menusMap.end(); itorMenus++)
	{
		itorMenus.value()->setTitle(qApp->translate(c_sMainFrame, itorMenus.key().toLatin1().data()));
	}

    QMap<QString, QAbstractButton*>::iterator itorAbstractButtons = m_abstractButtonsMap.begin();
    for (; itorAbstractButtons != m_abstractButtonsMap.end(); itorAbstractButtons++)
    {
        itorAbstractButtons.value()->setText(qApp->translate(c_sMainFrame, itorAbstractButtons.key().toLatin1().data()));
        itorAbstractButtons.value()->setToolTip(qApp->translate(c_sMainFrame, itorAbstractButtons.key().toLatin1().data()));
    }
}

bool YLBuilderMainWindow::eventFilter(QObject *watched, QEvent *event)
{
    if (watched == this)
    {
        
        if (event->type() == QEvent::Paint)
        {
            QPaintEvent *tmpEvt = static_cast<QPaintEvent*>(event);
            qDebug() << event->type() << isClickWeb << "rect:" << tmpEvt->rect() << "region:" << tmpEvt->region();
        }
        else
        {
            qDebug() << "YLBuilderMainWindow:" << event->type();
        }
    }

    return RibbonWindow::eventFilter(watched, event);
}
