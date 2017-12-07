#include <QApplication>
#include <QDesktopWidget>
//#include "..\src\ribbon\QtnOfficeDefines.h"
#include <Windows.h>
#include <ShellAPI.h>
#include "aboutdialog.h"
#include "ribbonwindow.h"

#define Font_Default        "System Default"
#define Font_Normal         "Normal"
#define Font_Large          "Large"
#define Font_ExLarge        "Extra Large"
#define DPI_100_percent     "DPI 100%"


static int setupStyleEventNumber = -1;
/* SetupStyleEvent */
class SetupStyleEvent : public QEvent
{
public:
    //! Constructor for the event.
    explicit SetupStyleEvent(RibbonStyle::Theme theme);
public:
    // Returns the event type/number for SetupStyleEvent.
    // The type is registered on first access. Use this to detect incoming
    static QEvent::Type eventNumber();
    RibbonStyle::Theme theme() const { return themeId; }

protected:
    RibbonStyle::Theme themeId;
};

SetupStyleEvent::SetupStyleEvent(RibbonStyle::Theme theme) 
    : QEvent(SetupStyleEvent::eventNumber())
    , themeId(theme)
{
}

QEvent::Type SetupStyleEvent::eventNumber()
{
    if (setupStyleEventNumber < 0)
        setupStyleEventNumber = QEvent::registerEventType();
    return (QEvent::Type) setupStyleEventNumber;
}


/* RibbonWindow */
RibbonWindow::RibbonWindow(QWidget* parent)
    : Qtitan::RibbonMainWindow(parent)
    , m_defaultFont(8)
    , m_ribbonStyle(qobject_cast<Qtitan::RibbonStyle*>(qApp->style()))
{
    RibbonToolTip::setWrapMode(RibbonToolTip::/*AutoWrap*/NativeWrap);
    createOptions();

    QAction* actionAbout = ribbonBar()->addAction(QIcon(":/YLBuilderMainWindow/res/about.png"), "", Qt::ToolButtonIconOnly);
	m_actionsMap.insert(c_sMainFrameAbout, actionAbout);
    //actionAbout->setToolTip(tr("Display program<br />information, version number and copyright"));
    connect(actionAbout, SIGNAL(triggered()), this, SLOT(about()));

	QAction* actionHelp = ribbonBar()->addAction(QIcon(":/YLBuilderMainWindow/res/help.png"), "", Qt::ToolButtonIconOnly);
	m_actionsMap.insert(c_sMainFrameHelp, actionHelp);
	actionHelp->setShortcut(tr("F1"));
	connect(actionHelp, SIGNAL(triggered()), this, SLOT(onHelp()));
	//actionAbout->setToolTip(tr("Display program<br />information, version number and copyright"));
	//connect(actionHelp, SIGNAL(triggered()), this, SLOT(about()));

    m_actionRibbonMinimize = ribbonBar()->addAction(QIcon(":/YLBuilderMainWindow/res/ribbonMinimize.png"), "", Qt::ToolButtonIconOnly);
	m_actionsMap.insert(c_sMainFrameMinMax, m_actionRibbonMinimize);
    //m_actionRibbonMinimize->setStatusTip(tr("Show only the tab names on the Ribbon"));
    m_actionRibbonMinimize->setShortcut(tr("F12"));
    connect(m_actionRibbonMinimize, SIGNAL(triggered()), this, SLOT(maximizeToggle()));
    connect(ribbonBar(), SIGNAL(minimizationChanged(bool)), this, SLOT(minimizationChanged(bool)));

    m_actionRibbonMinimizeMenu = new QAction("", this);
	m_actionsMap.insert(c_sMainFrameMinMaxMenu, m_actionRibbonMinimizeMenu);
    m_actionRibbonMinimizeMenu->setCheckable(true);
    connect(m_actionRibbonMinimizeMenu, SIGNAL(triggered()), this, SLOT(maximizeToggle()));
    connect((QWidget*)ribbonBar()->quickAccessBar(), SIGNAL(showCustomizeMenu(QMenu*)), this, SLOT(showQuickAccessCustomizeMenu(QMenu*)));

    m_defaultFont = ribbonBar()->font().pointSize();
    QApplication::postEvent(this, new SetupStyleEvent(theme()));
}

RibbonWindow::~RibbonWindow()
{

}

void RibbonWindow::createOptions()
{
    Qtitan::RibbonStyle::Theme themeId = Qtitan::RibbonStyle::Office2007Blue;
    if (m_ribbonStyle)
        themeId = m_ribbonStyle->getTheme();

    m_menuOptions = ribbonBar()->addMenu("");
	m_menusMap.insert(c_sMainFrameSkin, m_menuOptions);

    //QMenu* m_menuOptions = new QMenu(ribbonBar());
    m_styleActions = new QActionGroup(this);

    QMenu* menuStyle2007 = new QMenu(this);
	m_menusMap.insert(c_sMainFrame2007Style, menuStyle2007);
    QAction* actionBlue = menuStyle2007->addAction("");
	m_actionsMap.insert(c_sMainFrame2007Blue, actionBlue);
    actionBlue->setCheckable(true);
    actionBlue->setChecked(themeId == RibbonStyle::Office2007Blue);
    actionBlue->setObjectName("Office2007Blue");

    QAction* actionBlack = menuStyle2007->addAction(tr("Black"));
	m_actionsMap.insert(c_sMainFrame2007Black, actionBlack);
    actionBlack->setCheckable(true);
    actionBlack->setChecked(themeId == RibbonStyle::Office2007Black);
	actionBlack->setObjectName("Office2007Black");

    QAction* actionSilver = menuStyle2007->addAction("");
	m_actionsMap.insert(c_sMainFrame2007Silver, actionSilver);
    actionSilver->setObjectName("Office2007Silver");
    actionSilver->setCheckable(true);
    actionSilver->setChecked(themeId == RibbonStyle::Office2007Silver);

    QAction* actionAqua = menuStyle2007->addAction("");
	m_actionsMap.insert(c_sMainFrame2007Aqua, actionAqua);
    actionAqua->setObjectName("Office2007Aqua");
    actionAqua->setCheckable(true);
    actionAqua->setChecked(themeId == RibbonStyle::Office2007Aqua);
    m_menuOptions->addMenu(menuStyle2007);

    m_menuOptions->addSeparator();

    QMenu* menuStyle2013 = new QMenu(this);
	m_menusMap.insert(c_sMainFrame2013Style, menuStyle2013);
    QAction* action2013White = menuStyle2013->addAction("");
	m_actionsMap.insert(c_sMainFrame2013White, action2013White);
    action2013White->setObjectName("Office2013White");
    action2013White->setCheckable(true);
    action2013White->setChecked(themeId == RibbonStyle::Office2013White);
    m_menuOptions->addMenu(menuStyle2013);

    QAction* action2013Gray = menuStyle2013->addAction("");
	m_actionsMap.insert(c_sMainFrame2013Gray, action2013Gray);
    action2013Gray->setObjectName("Office2013Gray");
    action2013Gray->setCheckable(true);
    action2013Gray->setChecked(themeId == RibbonStyle::Office2013Gray);
    m_menuOptions->addMenu(menuStyle2013);

    QAction* action2013Dark = menuStyle2013->addAction("");
	m_actionsMap.insert(c_sMainFrame2013Dark, action2013Dark);
    action2013Dark->setObjectName("Office2013Dark");
    action2013Dark->setCheckable(true);
    action2013Dark->setChecked(themeId == RibbonStyle::Office2013Dark);
    m_menuOptions->addMenu(menuStyle2013);

    m_styleActions->addAction(actionBlue);
    m_styleActions->addAction(actionBlack);
    m_styleActions->addAction(actionSilver);
    m_styleActions->addAction(actionAqua);
    m_styleActions->addAction(action2013White);
    m_styleActions->addAction(action2013Gray);
    m_styleActions->addAction(action2013Dark);

    connect(m_styleActions, SIGNAL(triggered(QAction*)), this, SLOT(options(QAction*)));
}

void RibbonWindow::about()
{
    Qtitan::AboutDialog::show(this, tr("About Qtitan Ribbon Controls Sample"), 
        tr("QtitanRibbon"), QLatin1String(QTN_VERSION_RIBBON_STR));
}

void RibbonWindow::onHelp()
{
	QString strFilePath("");
	strFilePath = qApp->applicationDirPath();
	strFilePath += "/doc/Help.chm";
	//QDesktopServices::openUrl(QUrl(strFilePath));
	ShellExecuteW(NULL, QString("open").toStdWString().c_str(),
		strFilePath.toStdWString().c_str(), NULL, NULL, SW_SHOW);
}

void RibbonWindow::optionsDialog()
{
}

void RibbonWindow::options(QAction* action)
{
    Qtitan::RibbonStyle::Theme themeId = Qtitan::RibbonStyle::Office2007Blue;
    if (action->objectName() == "Office2007Black")
        themeId = RibbonStyle::Office2007Black;
    else if (action->objectName() == "Office2007Silver")
        themeId = RibbonStyle::Office2007Silver;
    else if (action->objectName() == "Office2007Aqua")
        themeId = RibbonStyle::Office2007Aqua;
    else if (action->objectName() == "Windows7Scenic")
        themeId = OfficeStyle::Windows7Scenic;
    else if (action->objectName() == "Office2010Blue")
        themeId = OfficeStyle::Office2010Blue;
    else if (action->objectName() == "Office2010Silver")
        themeId = OfficeStyle::Office2010Silver;
    else if (action->objectName() == "Office2010Black")
        themeId = OfficeStyle::Office2010Black;
    else if (action->objectName() == "Office2013White")
        themeId = OfficeStyle::Office2013White;
    else if (action->objectName() == "Office2013Gray")
        themeId = OfficeStyle::Office2013Gray;
    else if (action->objectName() == "Office2013Dark")
        themeId = OfficeStyle::Office2013Dark;

    setOptions(themeId);
}

RibbonStyle::Theme RibbonWindow::theme() const
{
    if (m_ribbonStyle == Q_NULL)
    {
        Q_ASSERT(false);
        return (RibbonStyle::Theme)-1;
    }
    return m_ribbonStyle->getTheme();
}

void RibbonWindow::setOptions(RibbonStyle::Theme themeId)
{
    if (m_ribbonStyle == Q_NULL)
    {
        Q_ASSERT(false);
        return;
    }

    setButtonStyleTheme(themeId);

    m_ribbonStyle->setTheme(themeId);
    //m_actionDefault->setChecked(true);
    updateActionsTheme();
}

void RibbonWindow::setButtonStyleTheme(RibbonStyle::Theme themeId)
{
    if (QToolButton* button = ribbonBar()->getSystemButton())
    {
        if (themeId == OfficeStyle::Windows7Scenic   || 
            themeId == OfficeStyle::Office2010Blue   ||
            themeId == OfficeStyle::Office2010Silver ||
            themeId == OfficeStyle::Office2010Black  ||
            themeId == OfficeStyle::Office2013White  ||
            themeId == OfficeStyle::Office2013Gray   ||
            themeId == OfficeStyle::Office2013Dark)
            button->setToolButtonStyle(Qt::ToolButtonTextOnly);
        else
            button->setToolButtonStyle(Qt::ToolButtonFollowStyle);
    }
}

void RibbonWindow::updateActionsTheme()
{
    OfficeStyle::Theme theme = m_ribbonStyle->getTheme();

    QString strTheme = "Office2007Blue";
    if (theme == OfficeStyle::Office2007Black)
        strTheme = "Office2007Black";
    else if (theme == OfficeStyle::Office2007Silver)
        strTheme = "Office2007Silver";
    else if (theme == OfficeStyle::Office2007Aqua)
        strTheme = "Office2007Aqua";
    else if (theme == OfficeStyle::Windows7Scenic)
        strTheme = "Windows7Scenic";
    else if (theme == OfficeStyle::Office2010Silver)
        strTheme = "Office2010Silver";
    else if (theme == OfficeStyle::Office2010Blue)
        strTheme = "Office2010Blue";
    else if (theme == OfficeStyle::Office2010Black)
        strTheme = "Office2010Black";
    else if (theme == OfficeStyle::Office2013White)
        strTheme = "Office2013White";
    else if (theme == OfficeStyle::Office2013Gray)
        strTheme = "Office2013Gray";
    else if (theme == OfficeStyle::Office2013Dark)
        strTheme = "Office2013Dark";

    QList<QAction*> list = m_styleActions->actions();
    for (int i = 0, count = list.count(); count > i; i++)
        list[i]->setChecked(list[i]->objectName() == strTheme);
}

void RibbonWindow::includingAnimation(bool checked)
{
    if (Qtitan::OfficeStyle* st = qobject_cast<Qtitan::OfficeStyle*>(qApp->style()))
        st->setAnimationEnabled(checked);
}

void RibbonWindow::maximizeToggle()
{
    ribbonBar()->setMinimized(!ribbonBar()->isMinimized());
}

void RibbonWindow::minimizationChanged(bool minimized)
{
    m_actionRibbonMinimize->setChecked(minimized);
    m_actionRibbonMinimizeMenu->setChecked(minimized);
    m_actionRibbonMinimize->setIcon(minimized ? QIcon(":/YLBuilderMainWindow/res/ribbonMaximize.png") :  
        QIcon(":/YLBuilderMainWindow/res/ribbonMinimize.png"));
}

void RibbonWindow::optionsFont(QAction* act)
{
    QFont fnt = ribbonBar()->font();

    if (Font_Default == act->objectName())
        fnt.setPointSize(m_defaultFont);
    else if (Font_Normal == act->objectName())
        fnt.setPointSize(8);
    else if (Font_Large == act->objectName())
        fnt.setPointSize(11);
    else if (Font_ExLarge == act->objectName())
        fnt.setPointSize(13);

    ribbonBar()->setFont(fnt);
}

void RibbonWindow::setDPIToggled(bool on)
{
    m_actionDefault->setEnabled(on);
    m_actionNormal->setEnabled(on);
    m_actionLarge->setEnabled(on);
    m_actionExLarge->setEnabled(on);
    m_ribbonStyle->setDPIAware(on);
}

void RibbonWindow::setNativeScrollBarsToggled(bool on)
{
    m_ribbonStyle->setScrollBarsIgnored(on);
}

void RibbonWindow::setNativeDialogsToggled(bool on)
{
    m_ribbonStyle->setDialogsIgnored(on);
}

void RibbonWindow::showQuickAccessCustomizeMenu(QMenu* menu)
{
    menu->addSeparator()->setText(tr("Common Customization"));
    menu->addAction(ribbonBar()->quickAccessBarPosition() == RibbonBar::QATopPosition ? m_actionShowBelowRibbon : m_actionShowAboveRibbon);
    menu->addSeparator();
    menu->addAction(m_actionRibbonMinimizeMenu);
}

void RibbonWindow::switchQuickAccessBarPosition()
{
    ribbonBar()->setQuickAccessBarPosition(ribbonBar()->quickAccessBarPosition() == RibbonBar::QATopPosition ? 
        RibbonBar::QABottomPosition : RibbonBar::QATopPosition);
}

#ifdef Q_OS_WIN
void RibbonWindow::frameTheme(bool checked)
{
    ribbonBar()->setFrameThemeEnabled(checked);
}
#endif // Q_WIN

bool RibbonWindow::event(QEvent* event)
{
    if (event->type() == SetupStyleEvent::eventNumber())
    {
        SetupStyleEvent* setupStyleEvent = static_cast<SetupStyleEvent*>(event);
        setButtonStyleTheme(setupStyleEvent->theme());
    }
    return RibbonMainWindow::event(event);
}
