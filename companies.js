// ====== COMPANIES DIRECTORY - MOBILE RESPONSIVE ======

document.addEventListener('DOMContentLoaded', function() {
    console.log('Companies Directory loaded');
    
    // ====== ELEMENT REFERENCES ======
    const elements = {
        // Sidebar & Navigation
        sidebar: document.getElementById('sidebar'),
        mobileMenuToggle: document.getElementById('mobileMenuToggle'),
        sidebarClose: document.getElementById('sidebarClose'),
        sidebarOverlay: document.getElementById('sidebarOverlay'),
        notificationToggle: document.getElementById('notificationToggle'),
        
        // Theme Toggle
        themeToggle: document.getElementById('themeToggle'),
        
        // Search & Filter
        searchInput: document.getElementById('searchInput'),
        searchClear: document.getElementById('searchClear'),
        filterBtn: document.getElementById('filterBtn'),
        filterOptions: document.getElementById('filterOptions'),
        viewToggle: document.getElementById('viewToggle'),
        
        // Company Grid
        companiesGrid: document.getElementById('companiesGrid'),
        loadingState: document.getElementById('loadingState'),
        emptyState: document.getElementById('emptyState'),
        
        // Modals
        addCompanyBtn: document.getElementById('addCompanyBtn'),
        addFirstCompany: document.getElementById('addFirstCompany'),
        addCompanyModal: document.getElementById('addCompanyModal'),
        modalClose: document.getElementById('modalClose'),
        cancelBtn: document.getElementById('cancelBtn'),
        companyForm: document.getElementById('companyForm'),
        
        // Charts
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
        }
    ];
    
    // ====== INITIALIZATION ======
    function init() {
        loadTheme();
        setupEventListeners();
        loadCompanies();
        initChart();
        
        // Hide loading state after 1 second
        setTimeout(() => {
            elements.loadingState.style.display = 'none';
        }, 1000);
        
        console.log('Companies Directory initialized');
    }
    
    // ====== THEME MANAGEMENT ======
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const icon = elements.themeToggle.querySelector('i');
        const text = elements.themeToggle.querySelector('span');
        
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
        // Sidebar Toggle
        elements.mobileMenuToggle.addEventListener('click', toggleSidebar);
        elements.sidebarClose.addEventListener('click', toggleSidebar);
        elements.sidebarOverlay.addEventListener('click', toggleSidebar);
        
        // Theme Toggle
        elements.themeToggle.addEventListener('click', toggleTheme);
        
        // Search & Filter
        elements.searchInput.addEventListener('input', handleSearch);
        elements.searchClear.addEventListener('click', clearSearch);
        elements.filterBtn.addEventListener('click', toggleFilterOptions);
        elements.viewToggle.addEventListener('click', toggleView);
        
        // Company Management
        elements.addCompanyBtn.addEventListener('click', openAddCompanyModal);
        elements.addFirstCompany.addEventListener('click', openAddCompanyModal);
        elements.modalClose.addEventListener('click', closeAddCompanyModal);
        elements.cancelBtn.addEventListener('click', closeAddCompanyModal);
        elements.companyForm.addEventListener('submit', handleAddCompany);
        
        // Close modal on overlay click
        elements.addCompanyModal.addEventListener('click', function(e) {
            if (e.target === this) closeAddCompanyModal();
        });
        
        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeAddCompanyModal();
        });
        
        // Handle window resize
        window.addEventListener('resize', handleResize);
    }
    
    // ====== SIDEBAR FUNCTIONS ======
    function toggleSidebar() {
        elements.sidebar.classList.toggle('active');
        elements.sidebarOverlay.classList.toggle('active');
        document.body.style.overflow = elements.sidebar.classList.contains('active') ? 'hidden' : '';
    }
    
    // ====== THEME FUNCTIONS ======
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = elements.themeToggle.querySelector('i');
        const text = elements.themeToggle.querySelector('span');
        
        // Smooth transition
        document.body.style.transition = 'background-color 0.3s ease';
        
        if (newTheme === 'dark') {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        }
        
        // Update chart theme if exists
        if (elements.distributionChart) {
            elements.distributionChart.destroy();
            initChart();
        }
        
        showNotification(`Switched to ${newTheme} mode`);
    }
    
    // ====== SEARCH & FILTER FUNCTIONS ======
    function handleSearch() {
        const searchTerm = elements.searchInput.value.toLowerCase();
        elements.searchClear.style.display = searchTerm ? 'block' : 'none';
        filterCompanies();
    }
    
    function clearSearch() {
        elements.searchInput.value = '';
        elements.searchClear.style.display = 'none';
        filterCompanies();
    }
    
    function toggleFilterOptions() {
        elements.filterOptions.classList.toggle('active');
    }
    
    function toggleView() {
        const isGrid = elements.companiesGrid.classList.toggle('list-view');
        const icon = elements.viewToggle.querySelector('i');
        
        if (isGrid) {
            icon.className = 'fas fa-list';
            showNotification('Switched to list view');
        } else {
            icon.className = 'fas fa-th-large';
            showNotification('Switched to grid view');
        }
    }
    
    function filterCompanies() {
        const searchTerm = elements.searchInput.value.toLowerCase();
        const typeFilter = document.getElementById('companyTypeFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const sortBy = document.getElementById('sortBy').value;
        
        let filtered = companies.filter(company => {
            // Search filter
            const matchesSearch = !searchTerm || 
                company.name.toLowerCase().includes(searchTerm) ||
                company.contact.toLowerCase().includes(searchTerm) ||
                company.email.toLowerCase().includes(searchTerm) ||
                company.description.toLowerCase().includes(searchTerm);
            
            // Type filter
            const matchesType = typeFilter === 'all' || company.type === typeFilter;
            
            // Status filter
            const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
            
            return matchesSearch && matchesType && matchesStatus;
        });
        
        // Sort companies
        filtered.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'recent':
                    return b.id - a.id;
                case 'projects':
                    return b.projects - a.projects;
                default:
                    return 0;
            }
        });
        
        renderCompanies(filtered);
        
        // Show/hide empty state
        if (filtered.length === 0) {
            elements.emptyState.style.display = 'flex';
        } else {
            elements.emptyState.style.display = 'none';
        }
    }
    
    // ====== COMPANY RENDERING ======
    function loadCompanies() {
        renderCompanies(companies);
    }
    
    function renderCompanies(companyList) {
        elements.companiesGrid.innerHTML = '';
        
        companyList.forEach(company => {
            const companyCard = createCompanyCard(company);
            elements.companiesGrid.appendChild(companyCard);
        });
        
        // Update stats
        updateStats(companyList);
    }
    
    function createCompanyCard(company) {
        const card = document.createElement('div');
        card.className = 'company-card';
        card.dataset.id = company.id;
        
        // Get initials for logo
        const initials = company.name.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
        
        // Status color
        const statusColors = {
            active: 'var(--success)',
            inactive: 'var(--danger)',
            pending: 'var(--warning)'
        };
        
        card.innerHTML = `
            <div class="company-header">
                <div class="company-logo">${initials}</div>
                <h3 class="company-name">${company.name}</h3>
                <span class="company-type">${company.typeLabel}</span>
                <div class="company-status" style="position: absolute; top: 20px; right: 20px; display: flex; align-items: center; gap: 8px; font-size: 0.85rem;">
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: ${statusColors[company.status] || 'var(--gray)'}"></span>
                    <span style="color: rgba(255,255,255,0.9);">${company.status.charAt(0).toUpperCase() + company.status.slice(1)}</span>
                </div>
            </div>
            
            <div class="company-body">
                <div class="company-info">
                    <div class="info-item">
                        <i class="fas fa-user"></i>
                        <span>${company.contact}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-envelope"></i>
                        <span>${company.email}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span>${company.phone}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${company.address.substring(0, 30)}...</span>
                    </div>
                </div>
                
                <div class="company-projects">
                    <div class="info-item">
                        <i class="fas fa-hard-hat"></i>
                        <span><strong class="projects-count">${company.projects}</strong> Active Projects</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>Revenue: <strong>${company.revenue}</strong></span>
                    </div>
                </div>
            </div>
            
            <div class="company-footer">
                <div class="company-actions">
                    <button class="btn-action btn-view" onclick="viewCompany(${company.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn-action btn-edit" onclick="editCompany(${company.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-action btn-delete" onclick="deleteCompany(${company.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
                <div class="company-id">
                    <small>ID: #${company.id.toString().padStart(3, '0')}</small>
                </div>
            </div>
        `;
        
        return card;
    }
    
    // ====== COMPANY ACTIONS ======
    window.viewCompany = function(id) {
        const company = companies.find(c => c.id === id);
        if (company) {
            showNotification(`Viewing ${company.name}`, 'info');
            // In real app, redirect to company detail page
            // window.location.href = `company-detail.html?id=${id}`;
        }
    };
    
    window.editCompany = function(id) {
        const company = companies.find(c => c.id === id);
        if (company) {
            showNotification(`Editing ${company.name}`, 'warning');
            // In real app, open edit modal with company data
        }
    };
    
    window.deleteCompany = function(id) {
        if (confirm('Are you sure you want to delete this company?')) {
            companies = companies.filter(c => c.id !== id);
            filterCompanies();
            showNotification('Company deleted successfully', 'danger');
        }
    };
    
    // ====== MODAL FUNCTIONS ======
    function openAddCompanyModal() {
        elements.addCompanyModal.classList.add('active');
        elements.companyForm.reset();
        document.body.style.overflow = 'hidden';
    }
    
    function closeAddCompanyModal() {
        elements.addCompanyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function handleAddCompany(e) {
        e.preventDefault();
        
        // Get form values
        const newCompany = {
            id: companies.length + 1,
            name: document.getElementById('companyName').value,
            type: document.getElementById('companyType').value,
            typeLabel: document.getElementById('companyType').selectedOptions[0].text,
            contact: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            phone: document.getElementById('contactPhone').value || 'N/A',
            address: document.getElementById('companyAddress').value || 'N/A',
            status: document.getElementById('companyStatus').value,
            projects: Math.floor(Math.random() * 10) + 1,
            revenue: '$' + (Math.random() * 5).toFixed(1) + 'M',
            established: new Date().getFullYear().toString(),
            description: document.getElementById('companyDescription').value || 'No description provided'
        };
        
        // Add to companies array
        companies.unshift(newCompany);
        
        // Update UI
        filterCompanies();
        closeAddCompanyModal();
        
        // Show success message
        showNotification(`${newCompany.name} added successfully!`, 'success');
    }
    
    // ====== STATS FUNCTIONS ======
    function updateStats(filteredCompanies = companies) {
        const total = filteredCompanies.length;
        const active = filteredCompanies.filter(c => c.status === 'active').length;
        const projects = filteredCompanies.reduce((sum, company) => sum + company.projects, 0);
        
        // Update stats in UI
        document.querySelectorAll('.stat-value')[0].textContent = total;
        document.querySelectorAll('.stat-value')[1].textContent = active;
        document.querySelectorAll('.stat-value')[2].textContent = projects;
        
        // Calculate revenue
        const revenue = filteredCompanies.reduce((sum, company) => {
            const revenueValue = parseFloat(company.revenue.replace('$', '').replace('M', ''));
            return sum + (isNaN(revenueValue) ? 0 : revenueValue);
        }, 0);
        
        document.querySelectorAll('.stat-value')[3].textContent = '$' + revenue.toFixed(1) + 'M';
    }
    
    // ====== CHART FUNCTIONS ======
    function initChart() {
        const ctx = document.getElementById('distributionChart').getContext('2d');
        
        // Prepare data
        const companyTypes = ['Residential', 'Commercial', 'Plaza', 'Villa', 'Shop', 'Mixed'];
        const companyCounts = companyTypes.map(type => {
            return companies.filter(c => c.typeLabel === type).length;
        });
        
        // Colors based on theme
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? 'rgba(255, 255, 255, 0.87)' : 'rgba(0, 0, 0, 0.87)';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        
        elements.distributionChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: companyTypes,
                datasets: [{
                    data: companyCounts,
                    backgroundColor: [
                        'rgba(67, 97, 238, 0.8)',
                        'rgba(247, 37, 133, 0.8)',
                        'rgba(76, 201, 240, 0.8)',
                        'rgba(255, 209, 102, 0.8)',
                        'rgba(6, 214, 160, 0.8)',
                        'rgba(239, 71, 111, 0.8)'
                    ],
                    borderColor: [
                        'rgb(67, 97, 238)',
                        'rgb(247, 37, 133)',
                        'rgb(76, 201, 240)',
                        'rgb(255, 209, 102)',
                        'rgb(6, 214, 160)',
                        'rgb(239, 71, 111)'
                    ],
                    borderWidth: 2,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: textColor,
                            padding: 20,
                            font: {
                                size: 14
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${label}: ${value} companies (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // ====== UTILITY FUNCTIONS ======
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Icons for different types
        const icons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            danger: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="${icons[type] || icons.info}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getComputedStyle(document.documentElement).getPropertyValue('--bg-card')};
            color: ${getComputedStyle(document.documentElement).getPropertyValue('--black')};
            padding: 16px 20px;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 9999;
            box-shadow: var(--shadow-lg);
            animation: slideIn 0.3s ease;
            border-left: 4px solid var(--${type});
            max-width: 350px;
            border: 1px solid var(--gray);
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        document.body.appendChild(notification);
    }
    
    function handleResize() {
        // Close sidebar on resize to desktop
        if (window.innerWidth > 1024) {
            elements.sidebar.classList.remove('active');
            elements.sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Update chart if needed
        if (elements.distributionChart) {
            elements.distributionChart.resize();
        }
    }
    
    // ====== INITIALIZE ======
    init();
});