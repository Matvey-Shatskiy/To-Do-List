from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from database import (get_all_tasks as get_all_tasks_db, get_task_by_id as get_task_by_id_db,
                      create_task as create_task_db, update_task as update_task_db,
                      delete_task as delete_task_db, complete_task, archive_task,
                      get_archived_tasks, get_unarchived_tasks, init_db)

app = FastAPI()

init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/api/todos')
async def get_tasks(archived: bool = None):
    if archived:
        return get_archived_tasks()
    elif archived is False:
        return get_unarchived_tasks()
    else:
        return get_all_tasks_db()

@app.get('/api/todos/{task_id}')
async def get_task_by_id(task_id: int):
    return get_task_by_id_db(task_id)

@app.post('/api/todos')
async def create_task(data = Body()):
    task = data['task']
    priority = data['priority']
    created_at = data['createdAt']
    finish_at = data['finishAt']
    inserted_task_id = create_task_db(task, priority, created_at, finish_at)
    return {'inserted_task_id': inserted_task_id}

@app.put('/api/todos/{task_id}')
async def update_task(task_id: int, data = Body()):
    task = data['task']
    priority = data['priority']
    finish_at = data['finishAt']
    update_task_db(task_id, task, priority, finish_at)

@app.patch('/api/todos/{task_id}/complete')
async def completing_of_task(task_id: int, data = Body()):
    complete_task(task_id, data['completed'])

@app.patch('/api/todos/{task_id}/archive')
async def archiving_of_task(task_id: int, data = Body()):
    archive_task(task_id, data['archived'])

@app.delete('/api/todos/{task_id}')
async def delete_task(task_id: int):
    delete_task_db(task_id)
