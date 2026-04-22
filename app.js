document.addEventListener('DOMContentLoaded', () => {
    // 1. Mock Data for Informative Cards (Super Admin Dashboard)
    const mockStudents = [
        { id: 'STU-001', name: 'Alice Chen', status: 'Application Submitted', isUrgent: false },
        { id: 'STU-002', name: 'Bob Smith', status: 'Visa Interview Pending', isUrgent: true },
        { id: 'STU-003', name: 'Charlie Davis', status: 'SOP Drafting', isUrgent: false }
    ];

    const cardsContainer = document.getElementById('student-cards-container');

    function renderInformativeCards() {
        cardsContainer.innerHTML = '';
        mockStudents.forEach(student => {
            const card = document.createElement('div');
            card.className = 'student-card matte-3d';
            card.innerHTML = `
                <h3>${student.name}</h3>
                <p><strong>ID:</strong> ${student.id}</p>
                <p><span class="status ${student.isUrgent ? 'urgent' : ''}">${student.status}</span></p>
            `;
            cardsContainer.appendChild(card);
        });
    }

    // Initialize cards
    renderInformativeCards();

    // 2. Role-Based Access Control (RBAC) Logic
    const roleDropdown = document.getElementById('role-dropdown');

    // Segment IDs mapping
    const segments = {
        core: document.getElementById('segment-core'),
        academic: document.getElementById('segment-academic'),
        sop: document.getElementById('segment-sop'),
        application: document.getElementById('segment-application'),
        lrt: document.getElementById('segment-lrt')
    };

    // Matrix defining which roles see which segments
    // 'active' = full view
    // 'blurred' = blurred/locked view
    // 'hidden' = not visible at all
    const rbacMatrix = {
        'Super Admin': {
            core: 'active', academic: 'active', sop: 'active', application: 'active', lrt: 'active'
        },
        'Counsellor': {
            core: 'active', academic: 'blurred', sop: 'blurred', application: 'hidden', lrt: 'hidden'
        },
        'Consultant': {
            core: 'active', academic: 'active', sop: 'active', application: 'active', lrt: 'active'
        },
        'App Associate': {
            core: 'blurred', academic: 'active', sop: 'blurred', application: 'active', lrt: 'hidden'
        },
        'Content Writer': {
            core: 'blurred', academic: 'hidden', sop: 'active', application: 'hidden', lrt: 'hidden'
        },
        'LRT Team': {
            core: 'blurred', academic: 'hidden', sop: 'hidden', application: 'blurred', lrt: 'active'
        },
        'Test Prep': {
            core: 'blurred', academic: 'active', sop: 'hidden', application: 'hidden', lrt: 'hidden'
        },
        'Student': {
            core: 'active', academic: 'active', sop: 'active', application: 'active', lrt: 'active'
        }
    };

    function applyRBAC(role) {
        const permissions = rbacMatrix[role] || rbacMatrix['Super Admin'];

        for (const [segmentKey, accessLevel] of Object.entries(permissions)) {
            const segmentEl = segments[segmentKey];
            if (!segmentEl) continue;

            // Reset classes
            segmentEl.classList.remove('state-blurred', 'state-hidden');

            if (accessLevel === 'blurred') {
                segmentEl.classList.add('state-blurred');
            } else if (accessLevel === 'hidden') {
                segmentEl.classList.add('state-hidden');
            }
            // If 'active', do nothing (default state)
        }

        // Console log for debugging
        console.log(`Role changed to: ${role}. RBAC applied.`);
    }

    // Event listener for dropdown
    roleDropdown.addEventListener('change', (e) => {
        applyRBAC(e.target.value);
    });

    // Apply initial role on load
    applyRBAC(roleDropdown.value);
});
