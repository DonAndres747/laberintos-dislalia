export function formatDate(timestamp) {
    const d = timestamp.toDate();
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${mm}`;
}

export function renderTableHeader(columns) {
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr>${columns.map(c => `<th>${c}</th>`).join('')}</tr>`;
    return thead;
}

export function renderTutorRows(rows) {
    const tbody = document.createElement('tbody');
    rows.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.tutor}</td>
            <td>${data.username}</td>
            <td>${data.nickname}</td>
            <td>${formatDate(data.registrationDate)}</td>`;
        tbody.appendChild(row);
    });
    return tbody;
}

export function renderScoreRows(snapshot) {
    const tbody = document.createElement('tbody');
    snapshot.forEach(doc => {
        const data = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.nickname}</td>
            <td>${data.score}</td>
            <td>${data.correct ?? '-'} / ${data.answered ?? '-'}</td>
            <td>${data.tutor}</td>
            <td>${formatDate(data.date)}</td>`;
        tbody.appendChild(row);
    });
    return tbody;
}
