#ifndef WORKSPACEWIDGET_H
#define WORKSPACEWIDGET_H

#include <QApplication>
#include <QtWidgets/QMainWindow>
#include <QPainter>
#include <QStyle>
#include <QtnCommonStyle.h>

class WorkspaceWidget : public QMainWindow //QWidget
{
public:
    WorkspaceWidget(QWidget *parent = NULL)
        : QMainWindow(parent)
    {
        this->setWindowFlags(Qt::SubWindow);
        setAttribute(Qt::WA_MouseTracking);
        setAutoFillBackground(true);
        QPalette pal = palette();
        pal.setColor(QPalette::Background, QColor(255, 255, 255));
        setPalette(pal);
    }
protected:
    virtual void mousePressEvent(QMouseEvent* event)
    {
        Q_UNUSED(event);
        setFocus();
    }
    virtual void paintEvent(QPaintEvent* event)
    {
        Q_UNUSED(event);
        QPainter p(this);
        QStyleOption opt;
        opt.init(this);
        style()->drawPrimitive((QStyle::PrimitiveElement)(Qtitan::CommonStyle::PE_Workspace), &opt, &p, this);
    }
};

#endif // WORKSPACEWIDGET_H