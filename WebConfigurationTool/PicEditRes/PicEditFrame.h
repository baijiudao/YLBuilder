#ifndef PICEDITFRAME_H
#define PICEDITFRAME_H

#include "PicBaseFrame.h"
#include "BaseDockWidget.h"
class PicEditFrame : public PicBaseFrame// public WorkspaceWidget, public MessageTransmiter
{
    Q_OBJECT

public:
    PicEditFrame(QWidget *parent = NULL);
    virtual ~PicEditFrame();

	
private:
    
	MainGraphicsView *m_graphicsView;

	BaseDockWidget *m_pResDockWidget;

    QTabWidget *m_pPicEditTabWidget;

	IcgManagerWidget *m_pIcgManagerWidget;
protected:
    void changeEvent(QEvent *evt);

	virtual void onMessage(void* pSender, int iMessageType, void* pData);
    virtual void showEvent(QShowEvent *event);
    virtual void resizeEvent(QResizeEvent *event);

    void makeConnect();
protected Q_SLOTS:
	void onRadioDrawToolChange();
    void onMenuChange();
    void onCheckResDock(bool isShow);

    //void onNewSVG();

public slots:
    void showControlDockWidget(int state);
};


#endif // PICEDITFRAME_H