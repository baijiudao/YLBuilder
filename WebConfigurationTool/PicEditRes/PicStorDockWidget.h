#ifndef PICSTORDOCKWIDGET_H
#define PICSTORDOCKWIDGET_H

#include <QDockWidget>
//#include "QControlTableWidget.h"

class PicStorDockWidget : public QDockWidget
{
    Q_OBJECT

public:
    PicStorDockWidget(QWidget *parent);
    virtual ~PicStorDockWidget();

private:

protected:
	virtual void showEvent(QShowEvent *event);
	virtual void hideEvent(QHideEvent *event);

protected:
    //QControlTableWidget *m_pControlTable;

Q_SIGNALS:
	//void controlDockShow(bool);
};

#endif // QWEBEDITDOCKWIDGET_H
