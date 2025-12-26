// projects.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Projects JS Loaded');

    /* ===================== SIDEBAR TOGGLE (DESKTOP ONLY) ===================== */
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');

    // Desktop sidebar collapse/expand
    // Ye code sidebar ko collapse ya expand karta hai jab user toggle button pe click kare
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    /* ===================== ACTIVE MENU HIGHLIGHT ===================== */
    const menuItems = document.querySelectorAll('.sidebar-menu li a');
    // Ye code sidebar menu me active page ko highlight karta hai
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.parentElement.classList.remove('active'));
            item.parentElement.classList.add('active');
        });
    });

    /* ===================== DYNAMIC COMPANY INFO ===================== */
    const companyData = {
        name: 'Skyline Builders',
        type: 'Residential Construction',
        status: 'Active',
        id: '#001',
        description: 'Specialized in luxury residential buildings and high-end construction projects.',
        logo: 'SL',
        contactPerson: 'John Smith',
        email: 'john@skylinebuilders.com',
        phone: '+1 (234) 567-8900',
        address: '123 Construction Street, New York, NY 10001, United States',
        website: 'https://www.skylinebuilders.com',
        teamSize: '45 Employees',
        stats: {
            activeProjects: 8,
            totalRevenue: '$2.5M',
            establishedYear: 2018,
            completionRate: '92%'
        }
    };

    // Company info ko page ke elements me show karna
    document.getElementById('companyLogo').textContent = companyData.logo; // Logo initials
    document.getElementById('companyTitle').textContent = companyData.name; // Company name
    document.getElementById('companyTypeBadge').textContent = companyData.type; // Type badge
    document.getElementById('companyStatus').innerHTML = `<i class="fas fa-circle"></i> ${companyData.status}`; // Status indicator
    document.querySelector('.company-id').textContent = `ID: ${companyData.id}`; // Company ID
    document.getElementById('companyDescription').textContent = companyData.description; // Description
    document.getElementById('contactPerson').textContent = companyData.contactPerson; // Contact name
    document.getElementById('contactEmail').textContent = companyData.email; // Email
    document.getElementById('contactPhone').textContent = companyData.phone; // Phone
    document.getElementById('companyAddress').textContent = companyData.address; // Address
    document.getElementById('companyWebsite').innerHTML = `<a href="${companyData.website}" target="_blank">${companyData.website}</a>`; // Website link
    document.getElementById('teamSize').textContent = companyData.teamSize; // Team size

    // Stats show karna
    document.getElementById('activeProjects').textContent = companyData.stats.activeProjects;
    document.getElementById('totalRevenue').textContent = companyData.stats.totalRevenue;
    document.getElementById('establishedYear').textContent = companyData.stats.establishedYear;
    document.getElementById('completionRate').textContent = companyData.stats.completionRate;

    /* ===================== SAMPLE PROJECTS DATA ===================== */
    const projects = [
        { name: 'Luxury Villa', type: 'villa', status: 'active', location: 'Beverly Hills', budget: '$1M', duration: 12 },
        { name: 'Plaza Downtown', type: 'plaza', status: 'planning', location: 'New York', budget: '$5M', duration: 24 },
        { name: 'Residential Apartments', type: 'residential', status: 'completed', location: 'Brooklyn', budget: '$2.2M', duration: 18 },
        { name: 'Office Complex', type: 'commercial', status: 'on-hold', location: 'Manhattan', budget: '$3M', duration: 20 }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    const noProjects = document.getElementById('noProjects');

    // Function to render projects on page
    function renderProjects(projectsList) {
        projectsGrid.innerHTML = '';
        if (projectsList.length === 0) {
            noProjects.style.display = 'block'; // Agar koi project na ho
            return;
        } else {
            noProjects.style.display = 'none';
        }

        // Create project cards dynamically
        projectsList.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card');
            card.innerHTML = `
                <div class="project-header">
                    <h4>${project.name}</h4> <!-- Project Name -->
                    <span class="project-type">${project.type}</span> <!-- Type -->
                </div>
                <div class="project-body">
                    <p><strong>Status:</strong> ${project.status}</p> <!-- Status -->
                    <p><strong>Location:</strong> ${project.location}</p> <!-- Location -->
                    <p><strong>Budget:</strong> ${project.budget}</p> <!-- Budget -->
                    <p><strong>Duration:</strong> ${project.duration} months</p> <!-- Duration -->
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    renderProjects(projects); // Initial render

    /* ===================== SEARCH & FILTER ===================== */
    const projectSearch = document.getElementById('projectSearch');
    const projectStatusFilter = document.getElementById('projectStatusFilter');
    const projectTypeFilter = document.getElementById('projectTypeFilter');

    // Filter projects based on search, status, type
    function filterProjects() {
        const searchTerm = projectSearch.value.toLowerCase();
        const status = projectStatusFilter.value;
        const type = projectTypeFilter.value;

        const filtered = projects.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm);
            const matchesStatus = status === 'all' || p.status === status;
            const matchesType = type === 'all' || p.type === type;
            return matchesSearch && matchesStatus && matchesType;
        });

        renderProjects(filtered); // Show filtered projects
    }

    projectSearch.addEventListener('input', filterProjects);
    projectStatusFilter.addEventListener('change', filterProjects);
    projectTypeFilter.addEventListener('change', filterProjects);

    /* ===================== ACTIVITY TIMELINE ===================== */
    const activityTimeline = document.getElementById('activityTimeline');
    const activities = [
        'Project "Luxury Villa" completed successfully.',
        'New project "Plaza Downtown" added.',
        'Team meeting held on 15th Dec 2025.',
        'Budget updated for "Residential Apartments".'
    ];
    // Render activity timeline
    activities.forEach(act => {
        const div = document.createElement('div');
        div.classList.add('activity-item');
        div.textContent = act;
        activityTimeline.appendChild(div);
    });

    /* ===================== TEAM GRID ===================== */
    const teamGrid = document.getElementById('teamGrid');
    const teamMembers = [
        { name: 'Alice Johnson', role: 'Project Manager', avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=3498db&color=fff' },
        { name: 'Bob Smith', role: 'Engineer', avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=e67e22&color=fff' },
        { name: 'Charlie Brown', role: 'Architect', avatar: 'https://ui-avatars.com/api/?name=Charlie+Brown&background=2ecc71&color=fff' }
    ];
    // Render team members dynamically
    teamMembers.forEach(member => {
        const div = document.createElement('div');
        div.classList.add('team-card');
        div.innerHTML = `
            <img src="${member.avatar}" alt="${member.name}">
            <h4>${member.name}</h4>
            <p>${member.role}</p>
        `;
        teamGrid.appendChild(div);
    });

    /* ===================== PERFORMANCE CHART ===================== */
    const ctx = document.getElementById('performanceChart').getContext('2d');
    const performanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis months
            datasets: [{
                label: 'Project Progress %',
                data: [70, 75, 80, 85, 90, 92], // Y-axis data
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });

    /* ===================== ADD PROJECT MODAL ===================== */
    const addProjectBtn = document.getElementById('addProjectBtn');
    const addProjectModal = document.getElementById('addProjectModal');
    const projectModalClose = document.getElementById('projectModalClose');
    const cancelProjectBtn = document.getElementById('cancelProjectBtn');

    function openModal() { addProjectModal.style.display = 'block'; } // Open modal
    function closeModal() { addProjectModal.style.display = 'none'; } // Close modal

    addProjectBtn.addEventListener('click', openModal);
    projectModalClose.addEventListener('click', closeModal);
    cancelProjectBtn.addEventListener('click', closeModal);

    /* ===================== HANDLE NEW PROJECT SUBMISSION ===================== */
    const projectForm = document.getElementById('projectForm');
    projectForm.addEventListener('submit', e => {
        e.preventDefault();
        // Create new project object from form values
        const newProject = {
            name: document.getElementById('projectName').value,
            type: document.getElementById('projectType').value,
            status: document.getElementById('projectStatus').value,
            location: document.getElementById('projectLocation').value,
            budget: `$${document.getElementById('projectBudget').value}`,
            duration: document.getElementById('projectDuration').value
        };
        projects.push(newProject); // Add to projects array
        renderProjects(projects); // Re-render project grid
        projectForm.reset(); // Clear form
        closeModal(); // Close modal
    });

});
