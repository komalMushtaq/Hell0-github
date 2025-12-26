// materials.js - Materials Management JavaScript
// This file handles all interactive functionality for the Materials page

// ===== GLOBAL VARIABLES =====
let materialsData = []; // Will store all materials
let currentPage = 1;
const itemsPerPage = 10;
let filteredData = [];

// ===== DOM ELEMENTS =====
const materialsTableBody = document.getElementById('materialsTableBody');
const materialSearch = document.getElementById('materialSearch');
const categoryFilter = document.getElementById('categoryFilter');
const statusFilter = document.getElementById('statusFilter');
const projectFilter = document.getElementById('projectFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const addMaterialBtn = document.getElementById('addMaterialBtn');
const materialModal = document.getElementById('materialModal');
const materialForm = document.getElementById('materialForm');
const modalTitle = document.getElementById('modalTitle');
const closeModalBtn = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const projectsGrid = document.getElementById('projectsGrid');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeMaterialsPage();
});

/**
 * Initializes the materials page
 * Loads data, sets up event listeners, and renders initial content
 */
function initializeMaterialsPage() {
    // Load sample data
    loadSampleData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Render initial content
    renderMaterialsTable();
    renderProjectsGrid();
    
    // Update pagination info
    updatePaginationInfo();
}

// ===== SAMPLE DATA =====
/**
 * Loads sample materials data for demonstration
 * In a real application, this would come from an API
 */
function loadSampleData() {
    materialsData = [
        {
            id: 'MAT-001',
            name: 'Portland Cement 53 Grade',
            category: 'structural',
            quantity: 450,
            unit: 'bag',
            minStock: 200,
            unitCost: 380,
            projects: ['tower-a', 'tower-b', 'parking'],
            status: 'in-stock',
            lastUpdated: '2024-01-15',
            supplier: 'Ultratech Cement',
            usage: 'For structural concrete work, mixing ratio 1:2:4',
            specifications: 'OPC 53 Grade, IS:12269'
        },
        {
            id: 'MAT-002',
            name: 'TMT Steel Bars 12mm',
            category: 'structural',
            quantity: 8.5,
            unit: 'ton',
            minStock: 5,
            unitCost: 65000,
            projects: ['tower-a', 'clubhouse'],
            status: 'low-stock',
            lastUpdated: '2024-01-14',
            supplier: 'JSW Steel',
            usage: 'Main reinforcement for columns and beams',
            specifications: 'Fe-500D, IS:1786'
        },
        {
            id: 'MAT-003',
            name: 'River Sand',
            category: 'structural',
            quantity: 25,
            unit: 'cum',
            minStock: 15,
            unitCost: 1800,
            projects: ['tower-a', 'tower-b', 'parking', 'clubhouse', 'landscaping'],
            status: 'in-stock',
            lastUpdated: '2024-01-16',
            supplier: 'Local Supplier',
            usage: 'Fine aggregate for concrete and plastering',
            specifications: 'Zone II, IS:383'
        },
        {
            id: 'MAT-004',
            name: 'Asian Paints Royale',
            category: 'finishing',
            quantity: 120,
            unit: 'liter',
            minStock: 50,
            unitCost: 850,
            projects: ['tower-a', 'tower-b'],
            status: 'in-stock',
            lastUpdated: '2024-01-13',
            supplier: 'Asian Paints',
            usage: 'Interior walls painting, 2 coats recommended',
            specifications: 'Luxury emulsion, washable'
        },
        {
            id: 'MAT-005',
            name: 'Electrical Wires 2.5 sqmm',
            category: 'electrical',
            quantity: 850,
            unit: 'meter',
            minStock: 500,
            unitCost: 45,
            projects: ['tower-a', 'tower-b', 'parking', 'clubhouse'],
            status: 'in-stock',
            lastUpdated: '2024-01-12',
            supplier: 'Havells',
            usage: 'Internal wiring for lighting circuits',
            specifications: 'FR PVC, IS:694'
        },
        {
            id: 'MAT-006',
            name: 'PVC Pipes 4 inch',
            category: 'plumbing',
            quantity: 45,
            unit: 'meter',
            minStock: 30,
            unitCost: 320,
            projects: ['tower-a', 'tower-b'],
            status: 'low-stock',
            lastUpdated: '2024-01-15',
            supplier: 'Finolex',
            usage: 'Main drainage lines, slope 1:100 required',
            specifications: 'Schedule 40, IS:4985'
        },
        {
            id: 'MAT-007',
            name: 'Safety Helmets',
            category: 'safety',
            quantity: 12,
            unit: 'piece',
            minStock: 25,
            unitCost: 450,
            projects: ['tower-a', 'tower-b', 'parking', 'clubhouse'],
            status: 'out-of-stock',
            lastUpdated: '2024-01-10',
            supplier: '3M',
            usage: 'Head protection for all site workers',
            specifications: 'IS:2925, with chin strap'
        },
        {
            id: 'MAT-008',
            name: 'Vitrified Tiles 2x2 ft',
            category: 'finishing',
            quantity: 85,
            unit: 'box',
            minStock: 40,
            unitCost: 2800,
            projects: ['clubhouse', 'parking'],
            status: 'in-stock',
            lastUpdated: '2024-01-14',
            supplier: 'Kajaria',
            usage: 'Flooring for common areas, use tile adhesive',
            specifications: 'Polished, 60x60 cm'
        },
        {
            id: 'MAT-009',
            name: 'Concrete Blocks',
            category: 'structural',
            quantity: 2500,
            unit: 'piece',
            minStock: 1500,
            unitCost: 35,
            projects: ['tower-b', 'parking'],
            status: 'in-stock',
            lastUpdated: '2024-01-11',
            supplier: 'Local Manufacturer',
            usage: 'Partition walls, use cement mortar 1:6',
            specifications: 'Hollow blocks, 400x200x200mm'
        },
        {
            id: 'MAT-010',
            name: 'Waterproofing Compound',
            category: 'finishing',
            quantity: 85,
            unit: 'kg',
            minStock: 40,
            unitCost: 120,
            projects: ['tower-a', 'clubhouse'],
            status: 'in-stock',
            lastUpdated: '2024-01-09',
            supplier: 'Dr. Fixit',
            usage: 'Terrace waterproofing, apply in 2 coats',
            specifications: 'Polymer modified, IS:2645'
        }
    ];
    
    filteredData = [...materialsData];
}

// ===== EVENT LISTENERS SETUP =====
/**
 * Sets up all event listeners for the materials page
 */
function setupEventListeners() {
    // Search functionality
    materialSearch.addEventListener('input', filterMaterials);
    
    // Filter functionality
    categoryFilter.addEventListener('change', filterMaterials);
    statusFilter.addEventListener('change', filterMaterials);
    projectFilter.addEventListener('change', filterMaterials);
    
    // Clear filters
    clearFiltersBtn.addEventListener('click', clearFilters);
    
    // Modal functionality
    addMaterialBtn.addEventListener('click', openAddModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Form submission
    materialForm.addEventListener('submit', handleFormSubmit);
    
    // Modal close on outside click
    materialModal.addEventListener('click', function(e) {
        if (e.target === materialModal) {
            closeModal();
        }
    });
    
    // Pagination
    document.getElementById('prevPage').addEventListener('click', goToPrevPage);
    document.getElementById('nextPage').addEventListener('click', goToNextPage);
    
    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportToCSV);
    
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', refreshData);
    
    // Import button
    document.getElementById('importBtn').addEventListener('click', showImportModal);
}

// ===== MATERIALS TABLE RENDERING =====
/**
 * Renders the materials table with current data
 */
function renderMaterialsTable() {
    if (!materialsTableBody) return;
    
    // Calculate start and end indices for pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    // Clear existing table rows
    materialsTableBody.innerHTML = '';
    
    // If no materials found
    if (pageData.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="9" style="text-align: center; padding: 40px; color: #7f8c8d;">
                <i class="fas fa-box-open" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                <p>No materials found. Try adjusting your filters or add a new material.</p>
            </td>
        `;
        materialsTableBody.appendChild(row);
        return;
    }
    
    // Add rows for each material
    pageData.forEach(material => {
        const row = document.createElement('tr');
        
        // Get projects count
        const projectsCount = material.projects ? material.projects.length : 0;
        
        // Determine status badge class and text
        let statusClass = 'status-in-stock';
        let statusText = 'In Stock';
        
        if (material.status === 'low-stock') {
            statusClass = 'status-low-stock';
            statusText = 'Low Stock';
        } else if (material.status === 'out-of-stock') {
            statusClass = 'status-out-of-stock';
            statusText = 'Out of Stock';
        }
        
        row.innerHTML = `
            <td><strong>${material.id}</strong></td>
            <td>${material.name}</td>
            <td>${getCategoryName(material.category)}</td>
            <td>${material.quantity} ${material.unit}</td>
            <td>${material.unit}</td>
            <td>${projectsCount} project${projectsCount !== 1 ? 's' : ''}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>${formatDate(material.lastUpdated)}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewMaterial('${material.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editMaterial('${material.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteMaterial('${material.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        materialsTableBody.appendChild(row);
    });
    
    // Update pagination controls
    updatePaginationControls();
}

// ===== FILTERING FUNCTIONALITY =====
/**
 * Filters materials based on search and filter criteria
 */
function filterMaterials() {
    const searchTerm = materialSearch.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedStatus = statusFilter.value;
    const selectedProject = projectFilter.value;
    
    filteredData = materialsData.filter(material => {
        // Search term filter
        const matchesSearch = searchTerm === '' || 
            material.name.toLowerCase().includes(searchTerm) ||
            material.id.toLowerCase().includes(searchTerm) ||
            material.supplier.toLowerCase().includes(searchTerm);
        
        // Category filter
        const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
        
        // Status filter
        const matchesStatus = selectedStatus === 'all' || material.status === selectedStatus;
        
        // Project filter
        const matchesProject = selectedProject === 'all' || 
            (material.projects && material.projects.includes(selectedProject));
        
        return matchesSearch && matchesCategory && matchesStatus && matchesProject;
    });
    
    // Reset to first page when filtering
    currentPage = 1;
    
    // Re-render table and projects grid
    renderMaterialsTable();
    renderProjectsGrid();
    updatePaginationInfo();
}

/**
 * Clears all filters and resets to default view
 */
function clearFilters() {
    materialSearch.value = '';
    categoryFilter.value = 'all';
    statusFilter.value = 'all';
    projectFilter.value = 'all';
    
    filteredData = [...materialsData];
    currentPage = 1;
    
    renderMaterialsTable();
    renderProjectsGrid();
    updatePaginationInfo();
}

// ===== PROJECTS GRID RENDERING =====
/**
 * Renders the projects grid showing material usage across projects
 */
function renderProjectsGrid() {
    if (!projectsGrid) return;
    
    // Project data
    const projects = [
        {
            id: 'tower-a',
            name: 'Tower A',
            status: 'active',
            materials: filteredData.filter(m => m.projects && m.projects.includes('tower-a')),
            progress: 65
        },
        {
            id: 'tower-b',
            name: 'Tower B',
            status: 'active',
            materials: filteredData.filter(m => m.projects && m.projects.includes('tower-b')),
            progress: 45
        },
        {
            id: 'parking',
            name: 'Parking Complex',
            status: 'active',
            materials: filteredData.filter(m => m.projects && m.projects.includes('parking')),
            progress: 80
        },
        {
            id: 'clubhouse',
            name: 'Clubhouse',
            status: 'completed',
            materials: filteredData.filter(m => m.projects && m.projects.includes('clubhouse')),
            progress: 100
        },
        {
            id: 'landscaping',
            name: 'Landscaping',
            status: 'planned',
            materials: filteredData.filter(m => m.projects && m.projects.includes('landscaping')),
            progress: 15
        }
    ];
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        // Status class mapping
        let statusClass = 'status-active';
        if (project.status === 'completed') statusClass = 'status-completed';
        if (project.status === 'planned') statusClass = 'status-planned';
        
        // Get top 3 materials for this project
        const topMaterials = project.materials.slice(0, 3);
        
        card.innerHTML = `
            <div class="project-header">
                <div class="project-name">${project.name}</div>
                <span class="project-status ${statusClass}">${project.status.toUpperCase()}</span>
            </div>
            <div class="progress-bar" style="margin: 10px 0; height: 6px; background: #eee; border-radius: 3px;">
                <div style="width: ${project.progress}%; height: 100%; background: #3498db; border-radius: 3px;"></div>
            </div>
            <div style="font-size: 0.85rem; color: #7f8c8d; margin-bottom: 15px;">
                Progress: ${project.progress}% • Materials: ${project.materials.length}
            </div>
            <ul class="materials-list">
                ${topMaterials.map(material => `
                    <li>
                        <span>${material.name}</span>
                        <span class="material-quantity">${material.quantity} ${material.unit}</span>
                    </li>
                `).join('')}
            </ul>
            ${project.materials.length > 3 ? `
                <div style="text-align: center; margin-top: 10px;">
                    <button onclick="viewProjectMaterials('${project.id}')" 
                            style="background: none; border: none; color: #3498db; cursor: pointer; font-size: 0.85rem;">
                        +${project.materials.length - 3} more materials
                    </button>
                </div>
            ` : ''}
        `;
        
        projectsGrid.appendChild(card);
    });
}

// ===== MODAL FUNCTIONALITY =====
/**
 * Opens the modal for adding a new material
 */
function openAddModal() {
    modalTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add New Material';
    materialForm.reset();
    
    // Generate material code
    const nextId = materialsData.length + 1;
    document.getElementById('materialCode').value = `MAT-${String(nextId).padStart(3, '0')}`;
    
    materialModal.classList.add('active');
}

/**
 * Opens the modal for editing an existing material
 * @param {string} materialId - The ID of the material to edit
 */
function editMaterial(materialId) {
    const material = materialsData.find(m => m.id === materialId);
    if (!material) return;
    
    modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Material';
    
    // Fill form with material data
    document.getElementById('materialName').value = material.name;
    document.getElementById('materialCode').value = material.id;
    document.getElementById('materialCategory').value = material.category;
    document.getElementById('materialUnit').value = material.unit;
    document.getElementById('quantity').value = material.quantity;
    document.getElementById('minQuantity').value = material.minStock;
    document.getElementById('unitCost').value = material.unitCost;
    document.getElementById('supplier').value = material.supplier || '';
    document.getElementById('usageDescription').value = material.usage || '';
    document.getElementById('specifications').value = material.specifications || '';
    
    // Check projects checkboxes
    const projectCheckboxes = document.querySelectorAll('input[name="project"]');
    projectCheckboxes.forEach(checkbox => {
        checkbox.checked = material.projects && material.projects.includes(checkbox.value);
    });
    
    materialModal.classList.add('active');
}

/**
 * Closes the material modal
 */
function closeModal() {
    materialModal.classList.remove('active');
}

/**
 * Handles form submission for adding/editing materials
 * @param {Event} e - The form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const materialData = {
        id: document.getElementById('materialCode').value,
        name: document.getElementById('materialName').value,
        category: document.getElementById('materialCategory').value,
        unit: document.getElementById('materialUnit').value,
        quantity: parseFloat(document.getElementById('quantity').value),
        minStock: parseFloat(document.getElementById('minQuantity').value),
        unitCost: parseFloat(document.getElementById('unitCost').value),
        supplier: document.getElementById('supplier').value,
        usage: document.getElementById('usageDescription').value,
        specifications: document.getElementById('specifications').value,
        lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    // Get selected projects
    const selectedProjects = [];
    document.querySelectorAll('input[name="project"]:checked').forEach(checkbox => {
        selectedProjects.push(checkbox.value);
    });
    materialData.projects = selectedProjects;
    
    // Determine status based on stock level
    const stockRatio = materialData.quantity / materialData.minStock;
    if (stockRatio >= 1.5) {
        materialData.status = 'in-stock';
    } else if (stockRatio >= 1) {
        materialData.status = 'low-stock';
    } else {
        materialData.status = 'out-of-stock';
    }
    
    // Check if editing or adding new
    const existingIndex = materialsData.findIndex(m => m.id === materialData.id);
    
    if (existingIndex !== -1) {
        // Update existing material
        materialsData[existingIndex] = materialData;
        showNotification('Material updated successfully!', 'success');
    } else {
        // Add new material
        materialsData.push(materialData);
        showNotification('Material added successfully!', 'success');
    }
    
    // Update filtered data and re-render
    filteredData = [...materialsData];
    renderMaterialsTable();
    renderProjectsGrid();
    updatePaginationInfo();
    
    // Close modal
    closeModal();
}

// ===== MATERIAL ACTIONS =====
/**
 * Views detailed information about a material
 * @param {string} materialId - The ID of the material to view
 */
function viewMaterial(materialId) {
    const material = materialsData.find(m => m.id === materialId);
    if (!material) return;
    
    // Create a simple view modal (in a real app, this would be a proper modal)
    const projectsList = material.projects ? material.projects.map(p => getProjectName(p)).join(', ') : 'None';
    
    alert(`Material Details:\n\n` +
          `ID: ${material.id}\n` +
          `Name: ${material.name}\n` +
          `Category: ${getCategoryName(material.category)}\n` +
          `Quantity: ${material.quantity} ${material.unit}\n` +
          `Min Stock: ${material.minStock} ${material.unit}\n` +
          `Unit Cost: ₹${material.unitCost}\n` +
          `Supplier: ${material.supplier || 'Not specified'}\n` +
          `Projects: ${projectsList}\n\n` +
          `How to Use:\n${material.usage || 'Not specified'}\n\n` +
          `Specifications:\n${material.specifications || 'Not specified'}`);
}

/**
 * Deletes a material after confirmation
 * @param {string} materialId - The ID of the material to delete
 */
function deleteMaterial(materialId) {
    if (!confirm('Are you sure you want to delete this material?')) {
        return;
    }
    
    const materialIndex = materialsData.findIndex(m => m.id === materialId);
    if (materialIndex !== -1) {
        materialsData.splice(materialIndex, 1);
        filteredData = [...materialsData];
        
        renderMaterialsTable();
        renderProjectsGrid();
        updatePaginationInfo();
        
        showNotification('Material deleted successfully!', 'success');
    }
}

/**
 * Views all materials for a specific project
 * @param {string} projectId - The ID of the project
 */
function viewProjectMaterials(projectId) {
    const projectMaterials = materialsData.filter(m => 
        m.projects && m.projects.includes(projectId)
    );
    
    const projectName = getProjectName(projectId);
    
    let message = `Materials used in ${projectName}:\n\n`;
    projectMaterials.forEach((material, index) => {
        message += `${index + 1}. ${material.name} - ${material.quantity} ${material.unit}\n`;
    });
    
    alert(message);
}

// ===== PAGINATION =====
/**
 * Goes to the previous page
 */
function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderMaterialsTable();
        updatePaginationInfo();
    }
}

/**
 * Goes to the next page
 */
function goToNextPage() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderMaterialsTable();
        updatePaginationInfo();
    }
}

/**
 * Updates pagination information display
 */
function updatePaginationInfo() {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredData.length);
    const totalItems = filteredData.length;
    
    document.getElementById('startItem').textContent = startItem;
    document.getElementById('endItem').textContent = endItem;
    document.getElementById('totalItems').textContent = totalItems;
}

/**
 * Updates pagination control buttons state
 */
function updatePaginationControls() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

// ===== UTILITY FUNCTIONS =====
/**
 * Gets the display name for a category
 * @param {string} category - The category code
 * @returns {string} The display name
 */
function getCategoryName(category) {
    const categories = {
        'structural': 'Structural',
        'finishing': 'Finishing',
        'electrical': 'Electrical',
        'plumbing': 'Plumbing',
        'safety': 'Safety',
        'tools': 'Tools'
    };
    return categories[category] || category;
}

/**
 * Gets the display name for a project
 * @param {string} projectId - The project ID
 * @returns {string} The project name
 */
function getProjectName(projectId) {
    const projects = {
        'tower-a': 'Tower A',
        'tower-b': 'Tower B',
        'parking': 'Parking Complex',
        'clubhouse': 'Clubhouse',
        'landscaping': 'Landscaping'
    };
    return projects[projectId] || projectId;
}

/**
 * Formats a date string for display
 * @param {string} dateString - The date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
}

/**
 * Shows a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning)
 */
function showNotification(message, type = 'info') {
    // In a real app, this would use a proper notification system
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(message);
}

/**
 * Exports materials data to CSV
 */
function exportToCSV() {
    const headers = ['ID', 'Name', 'Category', 'Quantity', 'Unit', 'Min Stock', 'Unit Cost', 'Status', 'Projects'];
    const csvData = filteredData.map(material => [
        material.id,
        material.name,
        getCategoryName(material.category),
        material.quantity,
        material.unit,
        material.minStock,
        material.unitCost,
        material.status,
        material.projects ? material.projects.map(p => getProjectName(p)).join('; ') : ''
    ]);
    
    const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `materials_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    showNotification('Export completed! CSV file downloaded.', 'success');
}

/**
 * Refreshes the materials data
 */
function refreshData() {
    // In a real app, this would fetch fresh data from the server
    showNotification('Data refreshed!', 'info');
    
    // Simulate refresh by re-rendering
    renderMaterialsTable();
    renderProjectsGrid();
    updatePaginationInfo();
}

/**
 * Shows the import modal (placeholder function)
 */
function showImportModal() {
    alert('Import functionality would open here.\n\nSupported formats: CSV, Excel\nMax file size: 10MB');
}