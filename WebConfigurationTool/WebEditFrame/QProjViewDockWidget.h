#pragma once

#include <QDockWidget>

class QProjViewDockWidget : public QDockWidget
{
	Q_OBJECT

public:
	QProjViewDockWidget(QWidget *parent);
	virtual ~QProjViewDockWidget();

protected:
	virtual void showEvent(QShowEvent *event);
	virtual void hideEvent(QHideEvent *event);

protected:
	

Q_SIGNALS:
	void controlDockShow(bool);
};
