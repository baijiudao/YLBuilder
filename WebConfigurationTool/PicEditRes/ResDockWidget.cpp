#include "ResDockWidget.h"

ResDockWidget::ResDockWidget(QWidget *parent)
    : QDockWidget(parent)
{
    setFeatures(QDockWidget::DockWidgetClosable | QDockWidget::DockWidgetMovable | QDockWidget::DockWidgetFloatable);
    setAllowedAreas(Qt::LeftDockWidgetArea | Qt::RightDockWidgetArea);

    /*m_pControlTable = new QControlTableWidget;
    m_pControlTable->show();
    setWidget(m_pControlTable);*/
	this->setMaximumWidth(150);
}

ResDockWidget::~ResDockWidget()
{

}

void ResDockWidget::showEvent(QShowEvent *event)
{
	QDockWidget::showEvent(event);
	emit controlDockShow(true);
	this->raise();
}

void ResDockWidget::hideEvent(QHideEvent *event)
{
	QDockWidget::hideEvent(event);
	emit controlDockShow(false);
}
