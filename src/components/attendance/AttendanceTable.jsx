// Sahip: Öğrenci 2
// TODO (Öğrenci 2): props: records, readOnly, onEdit, onDelete
// Sahip: Öğrenci 2
// Attendance kayıt listesi tablosu (readOnly destekli)

import { calcDailyHours, formatDuration, diffInMinutes } from '../../utils/timeCalculations';
import './AttendanceTable.css';

/**
 * ISO tarih metninden sadece saat kısmını (HH:mm) alır.
 * @param {string|null} isoString 
 * @returns {string}
 */
function formatTimeOnly(isoString) {
  if (!isoString) return '-';
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

export default function AttendanceTable({
  records = [],
  readOnly = true,
  onEdit,
  onDelete,
}) {
  if (!Array.isArray(records) || records.length === 0) {
    return (
      <div className="attendance-table-container">
        <div className="attendance-table__empty">Henüz gösterilecek bir devam kaydı bulunmuyor.</div>
      </div>
    );
  }

  return (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Giriş</th>
            <th>Çıkış</th>
            <th>Toplam Süre</th>
            <th>Normal</th>
            <th>Fazla Mesai</th>
            <th>Gece</th>
            <th>Not</th>
            {!readOnly && <th>İşlemler</th>}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const isOpen = record.clockOut === null;
            const daily = isOpen
              ? { regular: 0, overtime: 0, night: 0, total: 0 }
              : calcDailyHours(record);
            const durationMins = isOpen ? 0 : diffInMinutes(record.clockIn, record.clockOut);

            return (
              <tr key={record.id}>
                <td><strong>{record.date}</strong></td>
                <td>{formatTimeOnly(record.clockIn)}</td>
                <td>
                  {isOpen ? (
                    <span className="attendance-tag attendance-tag--active">Devam Ediyor</span>
                  ) : (
                    formatTimeOnly(record.clockOut)
                  )}
                </td>
                <td>{isOpen ? '-' : formatDuration(durationMins)}</td>
                <td>{isOpen ? '-' : `${daily.regular}s`}</td>
                <td>
                  {daily.overtime > 0 ? (
                    <span className="attendance-tag attendance-tag--overtime">+{daily.overtime}s</span>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {daily.night > 0 ? (
                    <span className="attendance-tag attendance-tag--night">{daily.night}s</span>
                  ) : (
                    '-'
                  )}
                </td>
                <td>{record.note || '-'}</td>
                {!readOnly && (
                  <td>
                    <div className="attendance-table__actions">
                      {onEdit && (
                        <button
                          type="button"
                          className="btn btn--ghost"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                          onClick={() => onEdit(record)}
                        >
                          Düzenle
                        </button>
                      )}
                      {onDelete && (
                        <button
                          type="button"
                          className="btn btn--danger"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                          onClick={() => onDelete(record)}
                        >
                          Sil
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}