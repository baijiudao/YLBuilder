#include "PicStorDockWidget.h"

PicStorDockWidget::PicStorDockWidget(QWidget *parent)
    : QDockWidget(parent)
{
    setFeatures(QDockWidget::DockWidgetClosable | QDockWidget::DockWidgetMovable | QDockWidget::DockWidgetFloatable);
    setAllowedAreas(Qt::LeftDockWidgetArea | Qt::RightDockWidgetArea);

    /*m_pControlTable = new QControlTableWidget;
    m_pControlTable->show();
    setWidget(m_pControlTable);*/
}

PicStorDockWidget::~PicStorDockWidget()
{

}

void PicStorDockWidget::showEvent(QShowEvent *event)
{
	QDockWidget::showEvent(event);
	//emit controlDockShow(true);
	this->raise();
}

void PicStorDockWidget::hideEvent(QHideEvent *event)
{
	QDockWidget::hideEvent(event);
	//emit controlDockShow(false);
}
