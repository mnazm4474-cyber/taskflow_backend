const projects = [
  { id: 1, name: "Website Redesign", desc: "Refresh the company website", workspace: "Acme Studio", creator: "Mohamed Mahmoud", progress: 72, tasks: 8, team: "Design Team" },
  { id: 2, name: "Mobile App", desc: "Build the next mobile experience", workspace: "Acme Studio", creator: "Ahmed Hassan", progress: 48, tasks: 6, team: "Product Team" },
  { id: 3, name: "Marketing Campaign", desc: "Q4 launch campaign", workspace: "Acme Studio", creator: "Shahd Ali", progress: 85, tasks: 5, team: "Marketing" },
  { id: 4, name: "Customer Portal", desc: "Self-service customer portal", workspace: "Acme Studio", creator: "Nour Samir", progress: 30, tasks: 5, team: "Product Team" }
];

const members = [
  { name: "Mohamed Mahmoud", role: "Owner", team: "Product Team", initials: "MM", color: "" },
  { name: "Ahmed Hassan", role: "Admin", team: "Product Team", initials: "AH", color: "green" },
  { name: "Shahd Ali", role: "Member", team: "Design Team", initials: "SA", color: "pink" },
  { name: "Nour Samir", role: "Member", team: "Design Team", initials: "NS", color: "gold" },
  { name: "Omar Adel", role: "Viewer", team: "Marketing", initials: "OA", color: "" }
];

let tasks = [
  { id: 1, title: "Finalize homepage wireframes", project: "Website Redesign", assignee: "Shahd Ali", priority: "High", status: "In progress", due: "2026-11-26" },
  { id: 2, title: "Review mobile navigation", project: "Mobile App", assignee: "Mohamed Mahmoud", priority: "Medium", status: "To do", due: "2026-11-27" },
  { id: 3, title: "Prepare launch email copy", project: "Marketing Campaign", assignee: "Nour Samir", priority: "Low", status: "In progress", due: "2026-11-28" },
  { id: 4, title: "Set up analytics events", project: "Customer Portal", assignee: "Ahmed Hassan", priority: "High", status: "To do", due: "2026-11-25" },
  { id: 5, title: "Update brand illustrations", project: "Website Redesign", assignee: "Shahd Ali", priority: "Medium", status: "Done", due: "2026-11-20" },
  { id: 6, title: "QA checkout flow", project: "Mobile App", assignee: "Mohamed Mahmoud", priority: "High", status: "In progress", due: "2026-11-29" },
  { id: 7, title: "Publish campaign landing page", project: "Marketing Campaign", assignee: "Omar Adel", priority: "Medium", status: "To do", due: "2026-11-30" },
  { id: 8, title: "Write API integration notes", project: "Customer Portal", assignee: "Ahmed Hassan", priority: "Low", status: "Done", due: "2026-11-22" }
];

let nextTaskId = 9;
let nextProjectId = 5;
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
}[char]));
const statusClass = status => status === "Done" ? "done" : status === "In progress" ? "progressing" : "todo";
const priorityClass = priority => priority.toLowerCase();

function avatar(name) {
  const member = members.find(person => person.name === name);
  const initials = member?.initials || name.split(" ").map(part => part[0]).join("").slice(0, 2);
  return `<span class="mini-avatar ${member?.color || ""}" aria-hidden="true">${escapeHTML(initials)}</span>`;
}

function renderOverview() {
  const today = new Date().toISOString().slice(0, 10);
  $("#statProjects").textContent = projects.length;
  $("#statTasks").textContent = tasks.length;
  $("#statCompleted").textContent = tasks.filter(task => task.status === "Done").length;
  $("#statOverdue").textContent = tasks.filter(task => task.status !== "Done" && task.due < today).length;
  $("#projectNavCount").textContent = projects.length;
  $("#taskNavCount").textContent = tasks.length;

  $("#overviewProjects").innerHTML = projects.slice(0, 4).map(project => `
    <div class="project-row">
      <div class="project-mark" aria-hidden="true">${escapeHTML(project.name[0])}</div>
      <div class="project-info">
        <strong>${escapeHTML(project.name)}</strong>
        <small>${project.tasks} tasks · ${escapeHTML(project.team)}</small>
        <div class="progress-track" role="progressbar" aria-label="${escapeHTML(project.name)} progress" aria-valuenow="${project.progress}" aria-valuemin="0" aria-valuemax="100">
          <span style="width:${project.progress}%"></span>
        </div>
      </div>
      <div class="project-percent">${project.progress}%</div>
    </div>`).join("");

  $("#recentTasks").innerHTML = tasks.slice(0, 4).map(task => `
    <div class="task-row">
      <input class="task-check" type="checkbox" ${task.status === "Done" ? "checked" : ""} data-complete="${task.id}" aria-label="Mark ${escapeHTML(task.title)} complete">
      <div class="task-main"><strong>${escapeHTML(task.title)}</strong><small>${escapeHTML(task.project)}</small></div>
      <span class="tf-badge pill ${statusClass(task.status)}">${escapeHTML(task.status)}</span>
    </div>`).join("");

  $("#overviewTeam").innerHTML = members.slice(0, 4).map(member => `
    <div class="team-row">${avatar(member.name)}
      <div class="member"><strong>${escapeHTML(member.name)}</strong><small>${escapeHTML(member.team)}</small></div>
      <span class="tf-badge pill todo">${escapeHTML(member.role)}</span>
    </div>`).join("");

  $("#deadlines").innerHTML = tasks.filter(task => task.status !== "Done").slice(0, 4).map(task => `
    <div class="task-row">
      <div class="task-main"><strong>${escapeHTML(task.title)}</strong><small>${escapeHTML(task.project)}</small></div>
      <span class="tf-badge pill ${priorityClass(task.priority)}">${escapeHTML(task.due.slice(5))}</span>
    </div>`).join("");
}

function renderProjects() {
  const query = $("#projectSearch").value.toLowerCase();
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(query) || project.desc.toLowerCase().includes(query)
  );

  $("#projectsTable").innerHTML = filteredProjects.map(project => `
    <tr>
      <td>${escapeHTML(project.name)}<div class="table-muted">${escapeHTML(project.desc)}</div></td>
      <td>${escapeHTML(project.workspace)}</td>
      <td>${project.tasks}</td>
      <td><div class="progress-cell"><div class="progress-track" role="progressbar" aria-label="${escapeHTML(project.name)} progress" aria-valuenow="${project.progress}" aria-valuemin="0" aria-valuemax="100"><span style="width:${project.progress}%"></span></div>${project.progress}%</div></td>
      <td>${escapeHTML(project.creator)}</td>
    </tr>`).join("") || '<tr><td colspan="5" class="tf-empty-state">No projects found.</td></tr>';
  $("#projectResultCount").textContent = `${filteredProjects.length} projects`;
}

function renderTasks() {
  const query = $("#taskSearch").value.toLowerCase();
  const status = $("#statusFilter").value;
  const priority = $("#priorityFilter").value;
  const filteredTasks = tasks.filter(task =>
    `${task.title} ${task.project} ${task.assignee}`.toLowerCase().includes(query) &&
    (!status || task.status === status) &&
    (!priority || task.priority === priority)
  );

  $("#tasksTable").innerHTML = filteredTasks.map(task => `
    <tr>
      <td>${escapeHTML(task.title)}</td>
      <td class="table-muted">${escapeHTML(task.project)}</td>
      <td>${avatar(task.assignee)} <span class="assignee-name">${escapeHTML(task.assignee)}</span></td>
      <td><span class="tf-badge pill ${priorityClass(task.priority)}">${escapeHTML(task.priority)}</span></td>
      <td><select class="tf-form-control status-select" aria-label="Change status for ${escapeHTML(task.title)}" data-status="${task.id}">
        <option ${task.status === "To do" ? "selected" : ""}>To do</option>
        <option ${task.status === "In progress" ? "selected" : ""}>In progress</option>
        <option ${task.status === "Done" ? "selected" : ""}>Done</option>
      </select></td>
      <td class="table-muted">${escapeHTML(task.due)}</td>
    </tr>`).join("") || '<tr><td colspan="6" class="tf-empty-state">No tasks match your filters.</td></tr>';
  $("#taskResultCount").textContent = `${filteredTasks.length} tasks`;
}

function renderTeams() {
  $("#teamCards").innerHTML = members.map(member => `
    <article class="tf-card team-card">
      <div class="team-card-top">${avatar(member.name)}<div><h3>${escapeHTML(member.name)}</h3><p>${escapeHTML(member.team)}</p></div></div>
      <div class="team-meta"><span>Workspace role</span><strong>${escapeHTML(member.role)}</strong></div>
    </article>`).join("");
}

function render() {
  renderOverview();
  renderProjects();
  renderTasks();
  renderTeams();
}

function navigate(page) {
  $$(".section").forEach(section => section.classList.toggle("active", section.id === page));
  $$(".nav-item[data-page]").forEach(button => {
    const active = button.dataset.page === page;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  $("#crumb").textContent = page[0].toUpperCase() + page.slice(1);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$(".nav-item[data-page]").forEach(button => button.addEventListener("click", () => navigate(button.dataset.page)));
$$("[data-goto]").forEach(button => button.addEventListener("click", () => navigate(button.dataset.goto)));
$("#projectSearch").addEventListener("input", renderProjects);
["taskSearch", "statusFilter", "priorityFilter"].forEach(id =>
  $("#" + id).addEventListener(id === "taskSearch" ? "input" : "change", renderTasks)
);
$("#globalSearch").addEventListener("input", event => {
  const query = event.target.value;
  if (!query) return;
  navigate("tasks");
  $("#taskSearch").value = query;
  renderTasks();
});

document.addEventListener("change", event => {
  if (event.target.dataset.status) {
    const task = tasks.find(item => item.id === Number(event.target.dataset.status));
    task.status = event.target.value;
    render();
  }
  if (event.target.dataset.complete) {
    const task = tasks.find(item => item.id === Number(event.target.dataset.complete));
    task.status = event.target.checked ? "Done" : "To do";
    render();
  }
});

const backdrop = $("#modalBackdrop");
const fields = $("#modalFields");
let modalType = "task";
let modalReturnFocus = null;

function openModal(type) {
  modalType = type;
  modalReturnFocus = document.activeElement;
  $("#modalTitle").textContent = type === "task" ? "Create task" : type === "project" ? "Create project" : "Invite team member";

  const markup = type === "task" ? `
    <div class="field full"><label for="taskTitle">Task title</label><input class="tf-form-control" id="taskTitle" name="title" required placeholder="e.g. Design landing page"></div>
    <div class="field"><label for="taskProject">Project</label><select class="tf-form-control" id="taskProject" name="project">${projects.map(project => `<option>${escapeHTML(project.name)}</option>`).join("")}</select></div>
    <div class="field"><label for="taskAssignee">Assignee</label><select class="tf-form-control" id="taskAssignee" name="assignee">${members.map(member => `<option>${escapeHTML(member.name)}</option>`).join("")}</select></div>
    <div class="field"><label for="taskPriority">Priority</label><select class="tf-form-control" id="taskPriority" name="priority"><option>Medium</option><option>High</option><option>Low</option></select></div>
    <div class="field"><label for="taskStatus">Status</label><select class="tf-form-control" id="taskStatus" name="status"><option>To do</option><option>In progress</option><option>Done</option></select></div>
    <div class="field full"><label for="taskDue">Due date</label><input class="tf-form-control" id="taskDue" name="due" type="date" required></div>` : type === "project" ? `
    <div class="field full"><label for="projectName">Project name</label><input class="tf-form-control" id="projectName" name="name" required placeholder="e.g. Website Redesign"></div>
    <div class="field full"><label for="projectDescription">Description</label><textarea class="tf-form-control" id="projectDescription" name="desc" placeholder="What is this project about?"></textarea></div>` : `
    <div class="field full"><label for="memberName">Member name</label><input class="tf-form-control" id="memberName" name="name" required placeholder="Full name"></div>
    <div class="field full"><label for="memberRole">Role</label><select class="tf-form-control" id="memberRole" name="role"><option>Member</option><option>Admin</option><option>Viewer</option></select></div>`;

  fields.innerHTML = markup;
  backdrop.classList.add("open");
  backdrop.setAttribute("aria-hidden", "false");
  fields.querySelector("input, textarea, select").focus();
}

function closeModal() {
  backdrop.classList.remove("open");
  backdrop.setAttribute("aria-hidden", "true");
  if (modalReturnFocus?.isConnected) modalReturnFocus.focus();
}

$("#newTaskBtn").addEventListener("click", () => openModal("task"));
$("#newTaskBtn2").addEventListener("click", () => openModal("task"));
$("#newProjectBtn").addEventListener("click", () => openModal("project"));
$("#inviteBtn").addEventListener("click", () => openModal("member"));
$("#closeModal").addEventListener("click", closeModal);
$("#cancelModal").addEventListener("click", closeModal);
backdrop.addEventListener("click", event => {
  if (event.target === backdrop) closeModal();
});
document.addEventListener("keydown", event => {
  if (backdrop.classList.contains("open")) {
    if (event.key === "Escape") {
      closeModal();
      return;
    }
    if (event.key === "Tab") {
      const focusable = [...backdrop.querySelectorAll("button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    return;
  }

  if (event.key === "Escape" && document.body.classList.contains("mobile-nav-open")) {
    document.body.classList.remove("mobile-nav-open");
    const sidebar = $("#sidebar");
    sidebar.inert = true;
    $("#sidebarToggle").setAttribute("aria-expanded", "false");
    $("#sidebarToggle").setAttribute("aria-label", "Open navigation");
    $("#sidebarToggle").focus();
  }
});

$("#entityForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  if (modalType === "task") {
    tasks.unshift({ id: nextTaskId++, ...data });
  } else if (modalType === "project") {
    projects.unshift({
      id: nextProjectId++,
      name: data.name,
      desc: data.desc || "New workspace project",
      workspace: "Acme Studio",
      creator: "Mohamed Mahmoud",
      progress: 0,
      tasks: 0,
      team: "Product Team"
    });
  } else {
    members.push({
      name: data.name,
      role: data.role,
      team: "Product Team",
      initials: data.name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase(),
      color: "green"
    });
  }

  closeModal();
  render();
  showToast(modalType === "task" ? "Task created" : modalType === "project" ? "Project created" : "Member added");
  event.target.reset();
});

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

render();
