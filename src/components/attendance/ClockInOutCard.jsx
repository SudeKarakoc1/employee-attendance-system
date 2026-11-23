// Sahip: Öğrenci 2 kARYA
// TODO (Öğrenci 2): Clock in/out butonu + canlı sayaç
// Sahip: Öğrenci 2 KARYAAAA///////////
// Clock in/out butonu + canlı sayaç bileşeni

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { clockIn, clockOut } from '../../services/attendanceService';
import './ClockInOutCard.css';

/**
 * Geçen süreyi HH:MM:SS formatına dönüştürür.
 * @param {number} totalSeconds 
 * @returns {string}
 */
function formatTimer(totalSeconds) {
  const pad = (n) => String(n).padStart(2, '0');
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function ClockInOutCard({ openRecord, onSuccess }) {
  const { user } = useAuth();
  const { showAlert, confirm } = useAlert();
  const [loading, setLoading] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Canlı sayaç: Açık kayıt varsa her saniye geçen süreyi hesapla
  useEffect(() => {
    if (!openRecord || !openRecord.clockIn) {
      return;
    }

    const calcElapsed = () => {
      const start = new Date(openRecord.clockIn).getTime();
      const now = Date.now();
      const diffSecs = Math.max(0, Math.floor((now - start) / 1000));
      setElapsedSeconds(diffSecs);
    };

    calcElapsed();
    const intervalId = setInterval(calcElapsed, 1000);

    return () => clearInterval(intervalId);
  }, [openRecord]);

  // Giriş yapma fonksiyonu
  const handleClockIn = async () => {
    setLoading(true);
    try {
      await clockIn(user.id);
      showAlert('Mesaiye giriş yapıldı. İyi çalışmalar!', 'success');
      if (onSuccess) onSuccess();
    } catch (err) {
      showAlert(err.message || 'Giriş yapılırken bir hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Çıkış yapma fonksiyonu
  const handleClockOut = async () => {
    const ok = await confirm({
      title: 'Mesaiden Çıkış Yap',
      message: 'Mesaiden çıkış yapmak istediğinize emin misiniz?',
      confirmText: 'Çıkış Yap',
      cancelText: 'Vazgeç',
      danger: true,
    });

    if (!ok) return;

    setLoading(true);
    try {
      await clockOut(openRecord.id);
      showAlert('Mesaiden başarıyla çıkış yapıldı.', 'success');
      if (onSuccess) onSuccess();
    } catch (err) {
      showAlert(err.message || 'Çıkış yapılırken bir hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isWorking = Boolean(openRecord);

  return (
    <div className="card clock-card">
      <div className="clock-card__header">
        <h3>Çalışma Durumu</h3>
        <span
          className={`clock-card__badge ${isWorking ? 'clock-card__badge--active' : 'clock-card__badge--inactive'
            }`}
        >
          <span className="clock-card__dot" />
          {isWorking ? 'Çalışıyor' : 'Mesai Dışında'}
        </span>
      </div>

      <div className="clock-card__body">
        {isWorking ? (
          <>
            <div className="clock-card__timer">{formatTimer(elapsedSeconds)}</div>
            <div className="clock-card__meta">
              Giriş: {new Date(openRecord.clockIn).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </>
        ) : (
          <div className="muted">Şu anda aktif bir çalışma kaydınız bulunmuyor.</div>
        )}
      </div>

      <div className="clock-card__actions">
        {isWorking ? (
          <button
            type="button"
            className="btn btn--danger clock-card__btn"
            onClick={handleClockOut}
            disabled={loading}
          >
            {loading ? 'İşleniyor...' : 'Çıkış Yap (Clock Out)'}
          </button>
        ) : (
          <button
            type="button"
            className="btn clock-card__btn"
            onClick={handleClockIn}
            disabled={loading}
          >
            {loading ? 'İşleniyor...' : 'Giriş Yap (Clock In)'}
          </button>
        )}
      </div>
    </div>
  );
}
