document.addEventListener('DOMContentLoaded', () => {
    // 1. Mock Data for Informative Cards (Super Admin Dashboard)
    const mockStudents = [
        { id: 'STU-001', name: 'Alice Chen', status: 'Application Submitted', isUrgent: false },
        { id: 'STU-002', name: 'Bob Smith', status: 'Visa Interview Pending', isUrgent: true },
        { id: 'STU-003', name: 'Charlie Davis', status: 'SOP Drafting', isUrgent: false }
    ];

    const cardsContainer = document.getElementById('student-cards-container');

    function renderInformativeCards() {
        if (!cardsContainer) return;
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

    // Initialize cards (only if the container exists on this page)
    if (cardsContainer) renderInformativeCards();

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
        'counselor': {
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

    // Event listener for dropdown (only if present on the page)
    if (roleDropdown) {
        roleDropdown.addEventListener('change', (e) => {
            applyRBAC(e.target.value);
        });

        // Apply initial role on load
        applyRBAC(roleDropdown.value);
    }

    // ─────────────────────────────────────────────
    //  counselor Dashboard – Lead Management State
    // ─────────────────────────────────────────────
    const leadListBody = document.getElementById('leadListBody');

    if (leadListBody) {
        const avatarColors = ['#1B4332', '#2d6a4f', '#40916c', '#D4AF37', '#a68a2a', '#4B0082'];

        const leads = [
            {
                id: 'STU-1001', name: 'Riya Sharma', nationality: 'Indian',
                email: 'riya.sharma@mail.com', phone: '+91 98765 43210',
                education: 'B.Tech Computer Science – VIT Vellore (2023)',
                workExp: '1 year – TCS Digital',
                targets: 'USA, Canada', budget: '₹35L', intake: 'Fall 2026',
                gre: 318, ielts: 7.5, toefl: null,
                paymentStatus: 'Success', status: 'new',
                identityVerified: false
            },
            {
                id: 'STU-1002', name: 'Arjun Mehta', nationality: 'Indian',
                email: 'arjun.m@mail.com', phone: '+91 87654 32109',
                education: 'B.Com Honours – SRCC Delhi (2022)',
                workExp: '2 years – Deloitte',
                targets: 'UK, Ireland', budget: '₹28L', intake: 'Spring 2027',
                gre: null, ielts: 8.0, toefl: 105,
                paymentStatus: 'Pending', status: 'doc-verify',
                identityVerified: true
            },
            {
                id: 'STU-1003', name: 'Sara Al-Farsi', nationality: 'Omani',
                email: 'sara.alfarsi@mail.com', phone: '+968 9123 4567',
                education: 'BSc Biology – Sultan Qaboos University (2024)',
                workExp: 'Fresher',
                targets: 'Australia', budget: '$45K AUD', intake: 'Fall 2026',
                gre: 310, ielts: null, toefl: 98,
                paymentStatus: 'Failed', status: 'new',
                identityVerified: false
            },
            {
                id: 'STU-1004', name: 'Liam O\'Brien', nationality: 'Irish',
                email: 'liam.ob@mail.com', phone: '+353 85 123 4567',
                education: 'BA Economics – Trinity College (2023)',
                workExp: '1 year – KPMG',
                targets: 'USA', budget: '€40K', intake: 'Fall 2026',
                gre: 325, ielts: 8.5, toefl: 112,
                paymentStatus: 'Success', status: 'in-progress',
                identityVerified: true
            },
            {
                id: 'STU-1005', name: 'Meera Patel', nationality: 'Indian',
                email: 'meera.p@mail.com', phone: '+91 99887 76655',
                education: 'B.Arch – CEPT Ahmedabad (2024)',
                workExp: 'Fresher',
                targets: 'Germany, Netherlands', budget: '₹18L', intake: 'Winter 2026',
                gre: null, ielts: 6.5, toefl: null,
                paymentStatus: 'Success', status: 'enrolled',
                identityVerified: true
            }
        ];

        let selectedLeadId = null;

        // -- Badge label helper --
        const statusLabel = (s) => ({
            'new': 'New', 'doc-verify': 'Doc Verify',
            'in-progress': 'In Progress', 'enrolled': 'Enrolled'
        }[s] || s);

        // -- Render lead list --
        function renderLeadList() {
            document.getElementById('leadCount').textContent = `${leads.length} Leads`;
            leadListBody.innerHTML = '';
            leads.forEach((lead, i) => {
                const initials = lead.name.split(' ').map(w => w[0]).join('');
                const div = document.createElement('div');
                div.className = 'lead-item' + (lead.id === selectedLeadId ? ' selected' : '');
                div.dataset.id = lead.id;
                div.innerHTML = `
                    <div class="lead-avatar" style="background:${avatarColors[i % avatarColors.length]}">${initials}</div>
                    <div class="lead-info">
                        <h4>${lead.name}</h4>
                        <p>${lead.id} · ${lead.nationality}</p>
                    </div>
                    <span class="lead-status ${lead.status}">${statusLabel(lead.status)}</span>
                `;
                div.addEventListener('click', () => selectLead(lead.id));
                leadListBody.appendChild(div);
            });
        }

        // -- Render student academic card --
        function renderStudentCard(lead) {
            const body = document.getElementById('studentCardBody');
            if (!lead) {
                body.innerHTML = `<div class="empty-state"><div class="empty-icon">👈</div><p>Select a lead from the pipeline to view their profile.</p></div>`;
                return;
            }
            const initials = lead.name.split(' ').map(w => w[0]).join('');
            const canApprove = lead.paymentStatus === 'Success';
            const payClass = lead.paymentStatus.toLowerCase();

            body.innerHTML = `
                <div class="profile-header">
                    <div class="profile-avatar">${initials}</div>
                    <div class="profile-meta">
                        <h2>${lead.name}</h2>
                        <p>${lead.email} · ${lead.phone}</p>
                        <span class="id-tag">${lead.id}</span>
                    </div>
                </div>

                <div class="data-section">
                    <div class="data-section-title">Academic History</div>
                    <div class="data-row"><span class="label">Education</span><span class="value">${lead.education}</span></div>
                    <div class="data-row"><span class="label">Work Experience</span><span class="value">${lead.workExp}</span></div>
                </div>

                <div class="data-section">
                    <div class="data-section-title">Test Prep Status</div>
                    <div class="score-grid">
                        <div class="score-chip">
                            <div class="exam-name">GRE</div>
                            <div class="exam-score ${lead.gre == null ? 'pending' : ''}">${lead.gre != null ? lead.gre : '—'}</div>
                            <div class="exam-status ${lead.gre == null ? 'not-taken' : ''}">${lead.gre != null ? 'Completed' : 'Not Taken'}</div>
                        </div>
                        <div class="score-chip">
                            <div class="exam-name">IELTS</div>
                            <div class="exam-score ${lead.ielts == null ? 'pending' : ''}">${lead.ielts != null ? lead.ielts : '—'}</div>
                            <div class="exam-status ${lead.ielts == null ? 'not-taken' : ''}">${lead.ielts != null ? 'Completed' : 'Not Taken'}</div>
                        </div>
                        <div class="score-chip">
                            <div class="exam-name">TOEFL</div>
                            <div class="exam-score ${lead.toefl == null ? 'pending' : ''}">${lead.toefl != null ? lead.toefl : '—'}</div>
                            <div class="exam-status ${lead.toefl == null ? 'not-taken' : ''}">${lead.toefl != null ? 'Completed' : 'Not Taken'}</div>
                        </div>
                    </div>
                </div>

                <div class="data-section">
                    <div class="data-section-title">Preferences</div>
                    <div class="data-row"><span class="label">Target Locations</span><span class="value">${lead.targets}</span></div>
                    <div class="data-row"><span class="label">Budget</span><span class="value">${lead.budget}</span></div>
                    <div class="data-row"><span class="label">Intake</span><span class="value">${lead.intake}</span></div>
                </div>

                <div class="data-section">
                    <div class="data-section-title">Payment</div>
                    <div class="payment-row">
                        <span class="label">Registration Fee</span>
                        <span class="payment-badge ${payClass}">${lead.paymentStatus}</span>
                    </div>
                </div>

                <div class="action-bar">
                    <button class="btn btn-outline" id="btnVerify" ${lead.identityVerified ? 'disabled' : ''}>
                        <span class="btn-icon">🛡️</span> ${lead.identityVerified ? 'Identity Verified' : 'Verify Identity'}
                    </button>
                    <button class="btn btn-gold" id="btnFollowUp">
                        <span class="btn-icon">📅</span> Schedule Follow-up
                    </button>
                    <div class="btn-wrapper">
                        <button class="btn btn-green" id="btnApprove" ${canApprove ? '' : 'disabled'}>
                            <span class="btn-icon">✓</span> Approve for Consultant
                        </button>
                        ${!canApprove ? '<span class="tooltip">Payment must be "Success" to approve</span>' : ''}
                    </div>
                </div>
            `;

            // Wire up action buttons
            document.getElementById('btnVerify').addEventListener('click', () => {
                lead.identityVerified = true;
                showToast('🛡️ Identity verified for ' + lead.name);
                renderStudentCard(lead);
            });

            document.getElementById('btnFollowUp').addEventListener('click', () => {
                showToast('📅 Follow-up scheduled for ' + lead.name);
            });

            document.getElementById('btnApprove').addEventListener('click', () => {
                if (lead.paymentStatus !== 'Success') return;
                lead.status = 'in-progress';
                showToast('✓ ' + lead.name + ' approved — forwarding to Consultant');
                renderLeadList();
                renderStudentCard(lead);
            });
        }

        // -- Select a lead --
        function selectLead(id) {
            selectedLeadId = id;
            renderLeadList();
            const lead = leads.find(l => l.id === id);
            renderStudentCard(lead);
        }

        // -- Toast notifications --
        function showToast(message) {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }

        // Initial render
        renderLeadList();
    }
});
