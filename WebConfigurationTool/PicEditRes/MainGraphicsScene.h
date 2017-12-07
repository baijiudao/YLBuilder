#ifndef MAINGRAPHICSSCENE_H
#define MAINGRAPHICSSCENE_H

#include <QGraphicsScene>
#include <QKeyEvent>
class MainGraphicsScene : public QGraphicsScene
{
    Q_OBJECT

public:
    MainGraphicsScene();
    ~MainGraphicsScene();

protected:
    void keyPressEvent(QKeyEvent *event);
    void keyReleaseEvent(QKeyEvent *event);
    void mousePressEvent(QGraphicsSceneMouseEvent *event);
    bool eventFilter(QObject *watched, QEvent *event) Q_DECL_OVERRIDE;
private:
    
};

#endif // MAINGRAPHICSSCENE_H
