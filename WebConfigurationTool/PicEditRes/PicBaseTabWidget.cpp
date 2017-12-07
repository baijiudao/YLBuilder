#include "PicBaseTabWidget.h"
#include <QTabBar>
#include <QMenu>
#include <QApplication>

PicBaseTabWidget::PicBaseTabWidget(QString filePath, QWidget *parent)
	: QTabWidget(parent)
{
	this->setAcceptDrops(true);
	this->setUsesScrollButtons(true);
	this->setMovable(true);
	
	this->setAcceptDrops(false);
	this->tabBar()->setContextMenuPolicy(Qt::CustomContextMenu);
	connect(this->tabBar(), &QTabBar::customContextMenuRequested, this, &PicBaseTabWidget::slotCustomContextMenuRequested);
	this->setTabsClosable(true);

}

PicBaseTabWidget::~PicBaseTabWidget()
{
}

void PicBaseTabWidget::slotCustomContextMenuRequested(const QPoint & pos)
{
	int index = this->currentIndex();
	if (index >= 0)
	{
		QMenu menu;
        menu.addAction(qApp->translate(c_sPicTabWidget, c_sPicCloseTable), this, SLOT(slotClosePic()));
        menu.addAction(qApp->translate(c_sPicTabWidget, c_sPicSave), this, SLOT(slotSavePic()));
        menu.addAction(qApp->translate(c_sPicTabWidget, c_sPicSaveAs), this, SLOT(slotSaveAsPic()));
		//QCursor::pos()让menu的位置在鼠标点击的的位置，
		menu.exec(QCursor::pos());
	}
}


void PicBaseTabWidget::slotClosePic()
{
    emit tabCloseRequested(currentIndex());
}

void PicBaseTabWidget::slotSavePic()
{
    emit signalSavePic();
}

void PicBaseTabWidget::slotSaveAsPic()
{
    emit signalSaveAsPic();
}
