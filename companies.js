// ====== COMPANIES DIRECTORY - MOBILE RESPONSIVE ======

document.addEventListener('DOMContentLoaded', function() {
    console.log('Companies Directory loaded');
    
    // ====== ELEMENT REFERENCES ======
    const elements = {
        sidebar: document.getElementById('sidebar'),
        mobileMenuToggle: document.getElementById('mobileMenuToggle'),
        sidebarClose: document.getElementById('sidebarClose'),
        sidebarOverlay: document.getElementById('sidebarOverlay'),
        notificationToggle: document.getElementById('notificationToggle'),

        themeToggle: document.getElementById('themeToggle'),

        searchInput: document.getElementById('searchInput'),
        searchClear: document.getElementById('searchClear'),
        filterBtn: document.getElementById('filterBtn'),
        filterOptions: document.getElementById('filterOptions'),
        viewToggle: document.getElementById('viewToggle'),

        companiesGrid: document.getElementById('companiesGrid'),
        loadingState: document.getElementById('loadingState'),
        emptyState: document.getElementById('emptyState'),

        addCompanyBtn: document.getElementById('addCompanyBtn'),
        addFirstCompany: document.getElementById('addFirstCompany'),
        addCompanyModal: document.getElementById('addCompanyModal'),
        modalClose: document.getElementById('modalClose'),
        cancelBtn: document.getElementById('cancelBtn'),
        companyForm: document.getElementById('companyForm'),

        distributionChart: null
    };
    
    // ====== SAMPLE COMPANY DATA ======
    let companies = [
        {
            id: 1,
            name: 'Skyline Builders',
            type: 'residential',
            typeLabel: 'Residential',
            contact: 'John Smith',
            email: 'john@skyline.com',
            phone: '+1234567890',
            address: '123 Construction St, New York',
            status: 'active',
            projects: 8,
            revenue: '$2.5M',
            established: '2018',
            description: 'Specialized in luxury residential buildings'
        },
        {
            id: 2,
            name: 'Plaza Developers',
            type: 'plaza',
            typeLabel: 'Plaza',
            contact: 'Sarah Johnson',
            email: 'sarah@plazadev.com',
            phone: '+1987654321',
            address: '456 Mall Road, Chicago',
            status: 'active',
            projects: 12,
            revenue: '$4.2M',
            established: '2015',
            description: 'Leading plaza and shopping complex developers'
        },
        {
            id: 3,
            name: 'Commercial Construct',
            type: 'commercial',
            typeLabel: 'Commercial',
            contact: 'Mike Brown',
            email: 'mike@commercial.com',
            phone: '+1122334455',
            address: '789 Business Ave, Los Angeles',
            status: 'active',
            projects: 6,
            revenue: '$1.8M',
            established: '2020',
            description: 'Office buildings and commercial spaces'
        },
        {
            id: 4,
            name: 'Villa Creations',
            type: 'villa',
            typeLabel: 'Villa',
            contact: 'Emma Wilson',
            email: 'emma@villa.com',
            phone: '+1444333222',
            address: '321 Luxury Lane, Miami',
            status: 'pending',
            projects: 4,
            revenue: '$1.2M',
            established: '2021',
            description: 'Custom luxury villa construction'
        },
        {
            id: 5,
            name: 'Shop & Store Builders',
            type: 'shop',
            typeLabel: 'Shop & Retail',
            contact: 'David Lee',
            email: 'david@shopbuild.com',
            phone: '+1555666777',
            address: '654 Retail Blvd, Houston',
            status: 'active',
            projects: 9,
            revenue: '$2.1M',
            established: '2019',
            description: 'Retail space construction specialists'
        },
        {
            id: 6,
            name: 'Mixed Development Co',
            type: 'mixed',
            typeLabel: 'Mixed Development',
            contact: 'Lisa Taylor',
            email: 'lisa@mixeddev.com',
            phone: '+1666777888',
            address: '987 Mixed Use St, Phoenix',
            status: 'inactive',
            projects: 3,
            revenue: '$0.9M',
            established: '2022',
            description: 'Integrated residential and commercial projects'
        },

{
            id: 7,
            name: 'Mixed Development Co',
            type: 'mixed',
            typeLabel: 'Mixed Development',
            contact: 'Lisa Taylor',
            email: 'lisa@mixeddev.com',
            phone: '+1666777888',
            address: '987 Mixed Use St, Phoenix',
            status: 'inactive',
            projects: 3,
            revenue: '$0.9M',
            established: '2022',
            description: 'Integrated residential and commercial projects'
        },
        {
            id: 6,
            name: 'Mixed Development Co',
            type: 'mixed',
            typeLabel: 'Mixed Development',
            contact: 'Lisa Taylor',
            email: 'lisa@mixeddev.com',
            phone: '+1666777888',
            address: '987 Mixed Use St, Phoenix',
            status: 'inactive',
            projects: 3,
            revenue: '$0.9M',
            established: '2022',
            description: 'Integrated residential and commercial projects'
        }


    ];
    
    // ====== INITIALIZATION ======
    function init() {
        loadTheme();
        setupEventListeners();

        // Ensure grid visible
        elements.companiesGrid.style.display = 'grid';

        // Initial load
        renderCompanies(companies);

        // Hide loading state after 1s
        setTimeout(() => {
            elements.loadingState.style.display = 'none';
        }, 1000);

        console.log('Companies Directory initialized');
    }

    // ====== THEME FUNCTIONS ======
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (!elements.themeToggle) return;
        const icon = elements.themeToggle.querySelector('i');
        const text = elements.themeToggle.querySelector('span');
        if (!icon || !text) return;

        if (savedTheme === 'dark') {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
    }

    // ====== EVENT LISTENERS ======
    function setupEventListeners() {
        if (elements.mobileMenuToggle) elements.mobileMenuToggle.addEventListener('click', toggleSidebar);
        if (elements.sidebarClose) elements.sidebarClose.addEventListener('click', toggleSidebar);
        if (elements.sidebarOverlay) elements.sidebarOverlay.addEventListener('click', toggleSidebar);

        if (elements.themeToggle) elements.themeToggle.addEventListener('click', toggleTheme);

        if (elements.searchInput) elements.searchInput.addEventListener('input', handleSearch);
        if (elements.searchClear) elements.searchClear.addEventListener('click', clearSearch);
        if (elements.filterBtn) elements.filterBtn.addEventListener('click', toggleFilterOptions);
        if (elements.viewToggle) elements.viewToggle.addEventListener('click', toggleView);

        if (elements.addCompanyBtn) elements.addCompanyBtn.addEventListener('click', openAddCompanyModal);
        if (elements.addFirstCompany) elements.addFirstCompany.addEventListener('click', openAddCompanyModal);
        if (elements.modalClose) elements.modalClose.addEventListener('click', closeAddCompanyModal);
        if (elements.cancelBtn) elements.cancelBtn.addEventListener('click', closeAddCompanyModal);
        if (elements.companyForm) elements.companyForm.addEventListener('submit', handleAddCompany);

        // Close modal on overlay click
        if (elements.addCompanyModal) {
            elements.addCompanyModal.addEventListener('click', function(e) {
                if (e.target === this) closeAddCompanyModal();
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeAddCompanyModal();
        });

        // Window resize
        window.addEventListener('resize', handleResize);
    }

    function toggleSidebar() {
        if (!elements.sidebar || !elements.sidebarOverlay) return;
        elements.sidebar.classList.toggle('active');
        elements.sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = elements.sidebar.classList.contains('active') ? 'hidden' : '';
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        loadTheme();
    }

    function handleSearch() {
        filterCompanies();
    }

    function clearSearch() {
        if (!elements.searchInput) return;
        elements.searchInput.value = '';
        filterCompanies();
    }

    function toggleFilterOptions() {
        if (!elements.filterOptions) return;
        elements.filterOptions.classList.toggle('active');
    }

    function toggleView() {
        if (!elements.companiesGrid) return;
        const isGrid = elements.companiesGrid.classList.toggle('list-view');
        const icon = elements.viewToggle ? elements.viewToggle.querySelector('i') : null;
        if (!icon) return;
        icon.className = isGrid ? 'fas fa-list' : 'fas fa-th-large';
    }

    // ====== FILTER & RENDER ======
    function filterCompanies() {
        const searchTerm = elements.searchInput ? elements.searchInput.value.toLowerCase() : '';
        const typeFilterEl = document.getElementById('companyTypeFilter');
        const statusFilterEl = document.getElementById('statusFilter');
        const sortByEl = document.getElementById('sortBy');

        const typeFilter = typeFilterEl ? typeFilterEl.value : 'all';
        const statusFilter = statusFilterEl ? statusFilterEl.value : 'all';
        const sortBy = sortByEl ? sortByEl.value : 'name';

        let filtered = companies.filter(company => {
            const matchesSearch = !searchTerm || 
                company.name.toLowerCase().includes(searchTerm) ||
                company.contact.toLowerCase().includes(searchTerm) ||
                company.email.toLowerCase().includes(searchTerm) ||
                company.description.toLowerCase().includes(searchTerm);
            const matchesType = typeFilter === 'all' || company.type === typeFilter;
            const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
            return matchesSearch && matchesType && matchesStatus;
        });

        // Sort
        filtered.sort((a,b)=>{
            switch(sortBy){
                case 'name': return a.name.localeCompare(b.name);
                case 'recent': return b.id - a.id;
                case 'projects': return b.projects - a.projects;
                default: return 0;
            }
        });

        renderCompanies(filtered);

        if (elements.emptyState) {
            elements.emptyState.style.display = filtered.length === 0 ? 'flex' : 'none';
        }
    }

    function renderCompanies(companyList) {
        if (!elements.companiesGrid) return;
        elements.companiesGrid.innerHTML = '';

        companyList.forEach(company => {
            const card = createCompanyCard(company);
            elements.companiesGrid.appendChild(card);
        });

        updateStats(companyList);
    }

    function createCompanyCard(company) {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.dataset.id = company.id;

        const initials = company.name.split(' ').map(w=>w[0]).join('').toUpperCase().substring(0,2);
        const statusColors = { active: 'var(--success)', inactive:'var(--danger)', pending:'var(--warning)' };

        card.innerHTML = `
            <div class="company-header">
                <div class="company-logo">${initials}</div>
                <h3 class="company-name">${company.name}</h3>
                <span class="company-type">${company.typeLabel}</span>
                <div class="company-status">
                    <span style="width:10px;height:10px;border-radius:50%;background:${statusColors[company.status]||'var(--gray)'}"></span>
                    <span>${company.status.charAt(0).toUpperCase()+company.status.slice(1)}</span>
                </div>
            </div>
            <div class="company-body">
                <div class="company-info">
                    <div class="info-item"><i class="fas fa-user"></i><span>${company.contact}</span></div>
                    <div class="info-item"><i class="fas fa-envelope"></i><span>${company.email}</span></div>
                    <div class="info-item"><i class="fas fa-phone"></i><span>${company.phone}</span></div>
                    <div class="info-item"><i class="fas fa-map-marker-alt"></i><span>${company.address.substring(0,30)}...</span></div>
                </div>
                <div class="company-projects">
                    <div class="info-item"><i class="fas fa-hard-hat"></i><span><strong class="projects-count">${company.projects}</strong> Active Projects</span></div>
                    <div class="info-item"><i class="fas fa-money-bill-wave"></i><span>Revenue: <strong>${company.revenue}</strong></span></div>
                </div>
            </div>
            <div class="company-footer">
                <div class="company-actions">
                    <button class="btn-action btn-view" onclick="viewCompany(${company.id})"><i class="fas fa-eye"></i> View</button>
                    <button class="btn-action btn-edit" onclick="editCompany(${company.id})"><i class="fas fa-edit"></i> Edit</button>
                    <button class="btn-action btn-delete" onclick="deleteCompany(${company.id})"><i class="fas fa-trash"></i> Delete</button>
                </div>
                <div class="company-id"><small>ID: #${company.id.toString().padStart(3,'0')}</small></div>
            </div>
        `;
        return card;
    }

    // ====== COMPANY ACTIONS ======
    window.viewCompany = function(id){ const c = companies.find(x=>x.id===id); if(c) alert(`Viewing ${c.name}`);}
    window.editCompany = function(id){ const c = companies.find(x=>x.id===id); if(c) alert(`Editing ${c.name}`);}
    window.deleteCompany = function(id){ if(confirm('Are you sure?')){ companies = companies.filter(c=>c.id!==id); filterCompanies();}}

    // ====== MODAL ======
    function openAddCompanyModal(){ if(!elements.addCompanyModal) return; elements.addCompanyModal.classList.add('active'); document.body.style.overflow='hidden';}
    function closeAddCompanyModal(){ if(!elements.addCompanyModal) return; elements.addCompanyModal.classList.remove('active'); document.body.style.overflow='';}

    function handleAddCompany(e){
        e.preventDefault();
        const newCompany = {
            id: companies.length+1,
            name: document.getElementById('companyName').value,
            type: document.getElementById('companyType').value,
            typeLabel: document.getElementById('companyType').selectedOptions[0].text,
            contact: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value||'N/A',
            address: document.getElementById('companyAddress').value||'N/A',
            status: document.getElementById('companyStatus').value,
            projects: Math.floor(Math.random()*10)+1,
            revenue: '$'+(Math.random()*5).toFixed(1)+'M',
            established: new Date().getFullYear().toString(),
            description: document.getElementById('companyDescription').value||'No description provided'
        };
        companies.unshift(newCompany);
        renderCompanies(companies);
        closeAddCompanyModal();
    }

    // ====== STATS ======
    function updateStats(list){
        if(!list) list = companies;
        const total = list.length;
        const active = list.filter(c=>c.status==='active').length;
        const projects = list.reduce((s,c)=>s+c.projects,0);
        document.querySelectorAll('.stat-value')[0].textContent = total;
        document.querySelectorAll('.stat-value')[1].textContent = active;
        document.querySelectorAll('.stat-value')[2].textContent = projects;

        const revenue = list.reduce((sum,c)=>{
            const v = parseFloat(c.revenue.replace('$','').replace('M',''));
            return sum + (isNaN(v)?0:v);
        },0);
        document.querySelectorAll('.stat-value')[3].textContent = '$'+revenue.toFixed(1)+'M';
    }

    // ====== RESIZE ======
    function handleResize(){ if(window.innerWidth>1024){ if(elements.sidebar) elements.sidebar.classList.remove('active'); if(elements.sidebarOverlay) elements.sidebarOverlay.classList.remove('active'); document.body.style.overflow='';}}

    // ====== INIT ======
    init();
});
