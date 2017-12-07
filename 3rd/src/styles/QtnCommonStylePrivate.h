/****************************************************************************
**
** Qtitan Library by Developer Machines (Microsoft-Ribbon implementation for Qt.C++)
** 
** Copyright (c) 2009-2015 Developer Machines (http://www.devmachines.com)
**           ALL RIGHTS RESERVED
** 
**  The entire contents of this file is protected by copyright law and
**  international treaties. Unauthorized reproduction, reverse-engineering
**  and distribution of all or any portion of the code contained in this
**  file is strictly prohibited and may result in severe civil and 
**  criminal penalties and will be prosecuted to the maximum extent 
**  possible under the law.
**
**  RESTRICTIONS
**
**  THE SOURCE CODE CONTAINED WITHIN THIS FILE AND ALL RELATED
**  FILES OR ANY PORTION OF ITS CONTENTS SHALL AT NO TIME BE
**  COPIED, TRANSFERRED, SOLD, DISTRIBUTED, OR OTHERWISE MADE
**  AVAILABLE TO OTHER INDIVIDUALS WITHOUT WRITTEN CONSENT
**  AND PERMISSION FROM DEVELOPER MACHINES
**
**  CONSULT THE END USER LICENSE AGREEMENT FOR INFORMATION ON
**  ADDITIONAL RESTRICTIONS.
**
****************************************************************************/
#ifndef QTN_COMMONSTYLEPRIVATE_H
#define QTN_COMMONSTYLEPRIVATE_H

#include <QTime>
#include <QEvent>
#include <QWidget>
#include <QColor>
#include <QBasicTimer>

#include "QtitanDef.h"
#include "QtnCommonStyle.h"

class QPainter;
class QSettings;
class QStyleOption;


QTITAN_BEGIN_NAMESPACE

/* StyleHelper */
class QTITAN_EXPORT StyleHelper : public QObject
{
public:
    StyleHelper(QObject* pParent);
    virtual ~StyleHelper();

public:
    void openIniFile(const QString& fileName);

public:
    QString getValue(const QString& prefix, const QString& key) const;
    QColor getColor(const QString& prefix, const QString& key, QColor color = QColor()) const;
    int getInteger(const QString& prefix, const QString& key, int val) const;

public:
    static QPixmap alphaBlend(const QPixmap& src);

protected:
    QSettings* m_pSettings;
};

/* QtitanAnimation */ 
class QtitanAnimation : public QObject
{
public :
    QtitanAnimation() : _widget(0), _running(true){}
    virtual ~QtitanAnimation();
public :
    QWidget* widget() const { return _widget; }
    bool running() const { return _running; }
    const QTime& startTime() const { return _startTime; }
    void setRunning(bool val) { _running = val; }
    void setWidget(QWidget* widget);
    void setStartTime(const QTime& startTime) { _startTime = startTime; }
public :
    virtual void paint(QPainter* painter, const QStyleOption* option);

protected:
    void drawBlendedImage(QPainter* painter, QRect rect, float value);
    virtual bool eventFilter(QObject* obj, QEvent* event);

protected:
    QTime _startTime;
    QWidget* _widget;
    QImage _primaryImage;
    QImage _secondaryImage;
    QImage _tempImage;
    bool _running;
};

/* QtitanTransition */
class QtitanTransition : public QtitanAnimation
{
public :
    QtitanTransition();
    virtual ~QtitanTransition();
public :
    void setDuration(int duration) { _duration = duration; }
    void setStartImage(const QImage& image) { _primaryImage = image; }
    void setEndImage(const QImage& image) { _secondaryImage = image; }
    virtual void paint(QPainter* painter, const QStyleOption* option);
    int duration() const { return _duration; }
public :
    int _duration;
};

class CommonPaintManager;
/* CommonStylePrivate */
class QTITAN_EXPORT CommonStylePrivate : public QObject
{
public:
    QTN_DECLARE_PUBLIC(CommonStyle)
public:
    explicit CommonStylePrivate();
    virtual ~CommonStylePrivate();
    static QString m_styleName;

public:
    void initialization();

    void doTimer();
    void startAnimation(QtitanAnimation*);
    void stopAnimation(const QWidget*);
    QtitanAnimation* widgetAnimation(const QWidget* widget) const;

    void setPalette(QWidget* widget);
    void unsetPalette(QWidget* widget);

    void setAutoFillBackground(QWidget* widget);
    void unsetAutoFillBackground(QWidget* widget);

    void setPaintManager(CommonPaintManager& paintManager);
    virtual void makePaintManager() = 0;

public:
    CommonPaintManager* m_paintManeger;
    QStyle* m_defaultStyle;
    StyleHelper* m_helper;
    QList<QtitanAnimation*> m_animations;
    QBasicTimer m_animationTimer;
    QHash<const QWidget*, QPalette> m_customPaletteWidgets; // widgets whose palette we tampered
    QHash<const QWidget*, bool> m_customAutoFillBackground; 
};

#define QTN_D_STYLE(Class) Class##Private& d = static_cast<Class*>(baseStyle())->qtn_d();

/* CommonPaintManager */
class QTITAN_EXPORT CommonPaintManager : public QObject
{
public:
    CommonPaintManager(CommonStyle* baseStyle);
    virtual ~CommonPaintManager();

public:
    CommonStyle* baseStyle() const;
    StyleHelper& helper() const;
    QPixmap cached(const QString &img) const;
    QPixmap cachedPath(const QString &img) const;
    QRect sourceRectImage(QRect rcSrc, int state = 0, int count = 1) const;

    void  drawImage(const QPixmap& soSrc, QPainter& p, const QRect& rcDest, const QRect& rcSrc, 
        QRect rcSizingMargins, QColor clrTransparent, bool alphaBlend = false) const;
    void  drawImage(const QPixmap& dcSrc, QPainter& p, const QRect& rcDest, const QRect& rcSrc, 
        QRect rcSizingMargins = QRect(QPoint(0, 0), QPoint(0, 0)), bool alphaBlend = false) const;
    void  drawPixmap(const QPixmap& dcSrc, QPainter& p, const QRect& rcDest, const QRect& rcSrc, 
        bool alpha, QRect rcSizingMargins = QRect(QPoint(0, 0), QPoint(0, 0)), bool alphaBlend = false) const;

    virtual void modifyColors() = 0;

protected:
    CommonStyle* m_base;

private:
    Q_DISABLE_COPY(CommonPaintManager)
};

QTITAN_END_NAMESPACE

#endif // QTN_COMMONSTYLEPRIVATE_H
