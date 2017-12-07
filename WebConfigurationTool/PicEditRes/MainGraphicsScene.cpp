#include "MainGraphicsScene.h"

MainGraphicsScene::MainGraphicsScene()
    : QGraphicsScene()
{
    setFocus();
}

MainGraphicsScene::~MainGraphicsScene()
{

}

void MainGraphicsScene::keyPressEvent(QKeyEvent *event)
{
    return QGraphicsScene::keyPressEvent(event);
}

void MainGraphicsScene::keyReleaseEvent(QKeyEvent *event)
{
    return QGraphicsScene::keyReleaseEvent(event);
}

void MainGraphicsScene::mousePressEvent(QGraphicsSceneMouseEvent *event)
{
    return QGraphicsScene::mousePressEvent(event);
}

bool MainGraphicsScene::eventFilter(QObject *watched, QEvent *event)
{
    return QGraphicsScene::eventFilter(watched, event);
}