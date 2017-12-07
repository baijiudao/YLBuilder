#include "BaseDockWidget.h"

BaseDockWidget::BaseDockWidget(QWidget *parent)
	: QDockWidget(parent)
{
	setFixedWidth(250);
}

BaseDockWidget::~BaseDockWidget()
{
}

void BaseDockWidget::showEvent(QShowEvent *event)
{
	QDockWidget::showEvent(event);
	emit controlDockShow(true);
	this->raise();
}

void BaseDockWidget::hideEvent(QHideEvent *event)
{
	QDockWidget::hideEvent(event);
}

void BaseDockWidget::closeEvent(QCloseEvent *event)
{
    QDockWidget::closeEvent(event);
    emit controlDockShow(false);
}
