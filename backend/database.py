import sqlite3

def init_db():
    conn = sqlite3.connect('ToDoList.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS Tasks 
                (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
                task TEXT NOT NULL, 
                priority VARCHAR(10) NOT NULL, 
                createdAt TEXT NOT NULL, 
                finishAt TEXT NOT NULL,
                completed BOOLEAN DEFAULT FALSE NOT NULL,
                archived BOOLEAN DE)''')
    conn.commit()
    conn.close()

def create_task(task, priority, created_at, finish_at):
    conn = sqlite3.connect('ToDoList.db')
    c = conn.cursor()
    c.execute('''INSERT INTO Tasks
                (task, priority, createdAt, finishAt)
                 VALUES (?, ?, ?, ?)''',
      (task, priority, created_at, finish_at))
    inserted_task_id = c.lastrowid
    conn.commit()
    conn.close()
    return inserted_task_id

def update_task(task_id, task, priority, finish_at):
    conn = sqlite3.connect('ToDoList.db')
    c = conn.cursor()
    c.execute('''UPDATE Tasks SET task=?, priority=?, finishAt=? WHERE id=?''',
              (task, priority, finish_at, task_id))
    conn.commit()
    conn.close()

def get_task_by_id(task_id):
    conn = sqlite3.connect('ToDoList.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('''SELECT * FROM Tasks WHERE id=?''', (task_id,))
    row = c.fetchone()
    task_by_id = dict(row)
    conn.close()
    return task_by_id

def get_all_tasks():
    conn = sqlite3.connect('ToDoList.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('''SELECT * FROM Tasks''')
    rows = c.fetchall()
    all_tasks = [dict(row) for row in rows]
    conn.close()
    return all_tasks

def delete_task(task_id):
    conn = sqlite3.connect('ToDoList.db')
    c = conn.cursor()
    c.execute('''DELETE FROM Tasks WHERE id=?''', (task_id,))
    conn.commit()
    conn.close()

def complete_task(task_id, completed):
    conn = sqlite3.connect('ToDoList.db')
    c = conn.cursor()
    c.execute('''UPDATE Tasks SET completed=? WHERE id=?''', (completed, task_id))
    conn.commit()
    conn.close()

def archive_task(task_id, archived):
    conn = sqlite3.connect('ToDoList.db')
    c = conn.cursor()
    c.execute('''UPDATE Tasks SET archived=? WHERE id=?''', (archived, task_id))
    conn.commit()
    conn.close()

def get_archived_tasks():
    conn = sqlite3.connect('ToDoList.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('''SELECT * FROM Tasks WHERE archived=TRUE''')
    rows = c.fetchall()
    archived_tasks = [dict(row) for row in rows]
    conn.close()
    return archived_tasks

def get_unarchived_tasks():
    conn = sqlite3.connect('ToDoList.db')
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('''SELECT * FROM Tasks WHERE archived=FALSE''')
    rows = c.fetchall()
    unarchived_tasks = [dict(row) for row in rows]
    conn.close()
    return unarchived_tasks