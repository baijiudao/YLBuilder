#ifndef RESDOCKWIDGET_H
#define RESDOCKWIDGET_H

#include <QDockWidget>
//#include "QControlTableWidget.h"

class ResDockWidget : public QDockWidget
{
    Q_OBJECT

public:
    ResDockWidget(QWidget *parent);
    virtual ~ResDockWidget();

private:

protected:
	virtual void showEvent(QShowEvent *event);
	virtual void hideEvent(QHideEvent *event);

protected:
    //QControlTableWidget *m_pControlTable;

Q_SIGNALS : 
	void controlDockShow(bool);
};

#endif // QWEBEDITDOCKWIDGET_H
