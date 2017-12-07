#ifndef RIBBONWINDOW_H
#define RIBBONWINDOW_H

#include <QtitanRibbon.h>
#include <QDesktopServices>
#include <QDir>
#include <QUrl>

static const char *c_sMainFrameAbout = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "About");
static const char *c_sMainFrameHelp = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Help");
static const char *c_sMainFrameMinMax = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Min/Max");
static const char *c_sMainFrameMinMaxMenu = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Menu Min/Max");
static const char *c_sMainFrameSkin = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "Skin");

static const char *c_sMainFrame2007Style = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "2007Style");
static const char *c_sMainFrame2007Blue = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "2007Blue");
static const char *c_sMainFrame2007Silver = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "2007Silver");
static const char *c_sMainFrame2007Aqua = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "2007Aqua");
static const char *c_sMainFrame2007Black = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "2007Black");

static const char *c_sMainFrame2013Style = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "2013Style");
static const char *c_sMainFrame2013White = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "2013White");
static const char *c_sMainFrame2013Gray = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "2013LightGray");
static const char *c_sMainFrame2013Dark = QT_TRANSLATE_NOOP("YLBuilderMainFrame", "2013DarkGray");

/* RibbonWindow */
class RibbonWindow : public Qtitan::RibbonMainWindow
{
  Q_OBJECT
public:
    RibbonWindow(QWidget* parent = Q_NULL);
	~RibbonWindow();
private:
    void createOptions();

protected Q_SLOTS:
    void about();
	void onHelp();
    virtual void options(QAction*);
    void optionsDialog();
    void includingAnimation(bool);
    void maximizeToggle();
    void minimizationChanged(bool minimized);
    void optionsFont(QAction* act);
    void setDPIToggled(bool);
    void setNativeScrollBarsToggled(bool);
    void setNativeDialogsToggled(bool);
    void showQuickAccessCustomizeMenu(QMenu* menu);
    void switchQuickAccessBarPosition();

#ifdef Q_OS_WIN
    void frameTheme(bool);
#endif // Q_OS_WIN

protected:
    RibbonStyle::Theme theme() const;
    void setOptions(RibbonStyle::Theme themeId);
    void setButtonStyleTheme(RibbonStyle::Theme themeId);
    void updateActionsTheme();

protected:
    virtual bool event(QEvent* event);

protected:
    QMenu* m_menuOptions;
    QActionGroup* m_styleActions;
    QAction* m_actionRibbonMinimize;
    QAction* m_actionRibbonMinimizeMenu;
    QAction* m_actionDefault;
    QAction* m_actionNormal;
    QAction* m_actionLarge;
    QAction* m_actionExLarge;
    QAction* m_actionShowBelowRibbon;
    QAction* m_actionShowAboveRibbon;

    int m_defaultFont;

    Qtitan::RibbonStyle* m_ribbonStyle;

public:
	QMap<QString, Qtitan::RibbonPage*> m_ribbonPageMap;
	QMap<QString, Qtitan::RibbonGroup*> m_ribbonGroupMap;
	QMap<QString, QAction*> m_actionsMap;
	QMap<QString, QAbstractButton*> m_abstractButtonsMap;
	QMap<QString, QMenu*> m_menusMap;
};

#endif // RIBBONWINDOW_H
