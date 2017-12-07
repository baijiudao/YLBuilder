#ifndef PICBASFRAME_H
#define PICBASFRAME_H

#include "PicEditToolBarWidget.h"
#include "..\Common\include\WorkspaceWidget.h"
#include "MoudleName.h"
#include "..\Common\include\MessageTransmiter.h"
#include "..\Common\include\MessageID.h"
#include "PicBaseTabWidget.h"

#define PICTURE_RES_PATH  "/data/icg"

class PicBaseFrame : public WorkspaceWidget, public MessageTransmiter
{
	Q_OBJECT

public:
    PicBaseFrame(QWidget *parent = NULL);
    ~PicBaseFrame();

    bool isChangeOfContent();
protected:
	void makeRibbon(int type);
    virtual void makeConnect();
    void makeTabWidget(QString strFilePath = "new file", QString strAllPath = "");
	//void changeEvent(QEvent *evt);
	//void openHtml(QString filePath);
	//void makeWebEditDockWidget();

    void NewSVG(QString strPath);

    void closeAllTable();
protected slots:
    virtual  void slotCurrentPageChanged(int index);
    virtual  void slotCloseTab(int index);
    virtual  void retranslate() {};
    virtual  void onMenuChange() {};

    void onIconStatus(int count, FontStyle style = FontStyle(), bool isExistPic = false);
    void onSetRadioButton();

    void onNewSVG();
    void onOpenSVG();
    void onSaveAsSVG();
    virtual void onSaveSVG();
    void onCloseSVG();
Q_SIGNALS:
    void sigSaveSVGtoICG(QString, QString);
    //void sigSaveSVGtoCurrentICG(QString, QString);
protected:
    MainGraphicsView *m_graphicsView;
    QWidget *pm_parent;
	PicBaseTabWidget        *m_pMainTabWidget;
    
    PicEditToolBarWidget *m_pToolBarWidget;
	RibbonMainWindow     *m_pMainWindow;

    QString m_strProPath;

};

#endif // PICBASFRAME_H