//******   Creat by Lone King 2016-9-16   ******//


#ifndef MESSAGETRANSMIT_GLOBAL_H
#define MESSAGETRANSMIT_GLOBAL_H

#include <QtCore/qglobal.h>

#ifdef MESSAGETRANSMIT_LIB
# define MESSAGETRANSMIT_EXPORT Q_DECL_EXPORT
#else
# define MESSAGETRANSMIT_EXPORT Q_DECL_IMPORT
#endif

#endif // MESSAGETRANSMIT_GLOBAL_H
