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
#ifndef QTN_RIBBONGROUPLAYOUT_H
#define QTN_RIBBONGROUPLAYOUT_H

#include <QLayout>
#include <QAction>
#include "QtitanDef.h"

QTITAN_BEGIN_NAMESPACE

class QTITAN_EXPORT GroupLayout : public QLayout
{
    Q_OBJECT
public:
    GroupLayout(QWidget* parent = Q_NULL);
    virtual ~GroupLayout();
public:
    virtual void insertAction(int index, QAction* action) = 0;
    virtual int indexOf(QAction* action) const = 0;
    virtual int indexOf(QWidget* widget) const { return QLayout::indexOf(widget); }
    virtual void cleanUpSizes() = 0;
    virtual void reposition(const QRect& rc) = 0;
};

QTITAN_END_NAMESPACE

#endif // QTN_RIBBONGROUPLAYOUT_H
