#ifndef PICSTOREDITFRAME_H
#define PICSTOREDITFRAME_H

#if defined(_MSC_VER) && (_MSC_VER >= 1600)  
# pragma execution_character_set("utf-8")  
#endif

#include "PicBaseFrame.h"
#include "BaseDockWidget.h"
#include "PictureStorageWidget.h"

class PicStorEditFrame : public PicBaseFrame//public WorkspaceWidget, public MessageTransmiter
{
    Q_OBJECT

public:
    PicStorEditFrame(QWidget *parent = NULL);
    virtual ~PicStorEditFrame();

private:

    /*Qtitan::RibbonPage* m_pageDrawTool;

	QMap<QString, const char *> m_charPtrMap;
	QMap<QString, Qtitan::RibbonPage*> m_ribbonPageMap;
	QMap<QString, Qtitan::RibbonGroup*> m_ribbonGroupMap;
	QMap<QString, QAction*> m_actionsMap;
	QMap<QString, QAbstractButton*> m_abstractButtonsMap;*/

	//QButtonGroup *m_btnGroupDraw;
    //QComboBox *m_SizeComboBox;
    BaseDockWidget *m_pResDockWidget;
    BaseDockWidget *m_pStorDockWidget;
protected:
    void changeEvent(QEvent *evt);
	virtual void onMessage(void* pSender, int iMessageType, void* pData);
    virtual void showEvent(QShowEvent *event);
    virtual void hideEvent(QHideEvent *event);
    virtual void resizeEvent(QResizeEvent *event);
    void makeConnect();

private Q_SLOTS:
    void onNewICG();
    void onSaveICG();
    void onSaveAsICG();
    void onOpenICG();
    void onCloseICG();

    virtual void onSaveSVG();

    void onCheckResDock(bool isShow);
    void onCheckStorDock(bool isShow);
    void onTreeRightClick(int strPathName, QString currentPath, QString originalPath = NULL);
    void onMkSVGFile(QString path);
protected Q_SLOTS:
    void onMenuChange();
    void showControlResDockWidget(int state);
    void showControlStorDockWidget(int state);
};


#endif // PICEDITFRAME_H