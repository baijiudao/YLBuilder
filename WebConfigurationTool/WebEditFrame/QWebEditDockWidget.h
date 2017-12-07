#ifndef QWEBEDITDOCKWIDGET_H
#define QWEBEDITDOCKWIDGET_H

#include <QDockWidget>
#include "QControlTableWidget.h"

class QWebEditDockWidget : public QDockWidget
{
    Q_OBJECT

public:
    QWebEditDockWidget(QWidget *parent);
    virtual ~QWebEditDockWidget();

private:

protected:
	virtual void showEvent(QShowEvent *event);
	virtual void hideEvent(QHideEvent *event);

protected:
    QControlTableWidget *m_pControlTable;

Q_SIGNALS:
	void controlDockShow(bool);
};

#endif // QWEBEDITDOCKWIDGET_H
