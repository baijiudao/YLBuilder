
#include <QWidget>
#include <QLabel>
#include <QHBoxLayout>

/* DemoMainWindow */
class DemoMainWindow : public QWidget
{
    Q_OBJECT
public:
    DemoMainWindow(const QString& productName, const QString& version);
protected:
    void setDemoWidget(QWidget* widget, QWidget* settings, Qt::Alignment alignment = Qt::AlignTop);
    void paintEvent(QPaintEvent* event);
protected slots:
    void aboutLinkActivated(const QString& link);
private:
    QLabel* m_infoButton;
    QWidget* m_settings;
    QString m_productName;
    QString m_version;
    QHBoxLayout* hl;
};

