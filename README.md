# **Ritematch: Innovative Job Matching Portal**

**Ritematch** is a full-stack application designed to intelligently match user skills with job requirements using NLP-based cosine similarity. The project includes a Django backend for data processing and APIs, and a React frontend for a seamless user interface.

## **Features**
- **Backend**:
  - User authentication (signup/signin).
  - Job retrieval and scoring via Rest APIs.
  - Intelligent job matching using NLP cosine similarity.
- **Frontend**:
  - User-friendly interface for interacting with job listings.
  - “Check My Job Score” feature to display personalized job matches.
- **Deployment**:
  - Backend hosted on a Django server.
  - Frontend hosted using Firebase.

---

## **Installation Guide**

### **Clone the Repository**
```bash
git clone https://github.com/your-username/RiteMatch.git
cd RiteMatch
```

### **Setup Backend**
1. **Navigate to Backend Directory:**
   ```bash
   cd backend
   ```
2. **Create Virtual Environment:**

    ```bash
    python -m venv venv
    ```

3. **Activate Virtual Environment:**

    - *On Windows:*
      ```bash
      venv\Scripts\activate
      ```
    - *On Linux/macOS:*
      ```bash
      source venv/bin/activate
      ```

4. **Install Dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

5. **Apply Migrations:**

    ```bash
    python manage.py migrate
    ```

6. **Run the Server:**

    ```bash
    python manage.py runserver
    ```

Now, you can access the RiteMatch at [http://localhost:8000/](http://localhost:8000/) in your web browser.

## Usage

- **Job Retrieval API:**
  - **Endpoint:** `/jobs/`
  - **Description:** Retrieves available jobs from the portal.

- **Job Score API:**
  - **Endpoint:** `/match/skills/`
  - **Description:** Provides a score for each job.
    
- **User Signup API:**
  - **Endpoint:** `/user/signup/`
  - **Description:** Handles user registration.

- **User Signin API:**
  - **Endpoint:** `/user/signin/`
  - **Description:** Handles user login.

- **Admin Interface:**
  - **Endpoint:** `/admin/`
  - **Description:** Access the Django admin interface for adding/removing superusers.

 ### Step 1: Clone the repository

```bash
git clone <repository-url>
cd <project-directory>/frontend
```

### **Setup Frontend**
1. **Navigate to Frontend Directory:**
   ```bash
   cd frontend
   ```
   
2. **Install necessary packages:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```
The above command will start the development server. Open your browser and visit http://localhost:3000 to access the React app.

## Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```
This command will create a build directory with the production-ready files.

2. **Install Firebase CLI (if not already installed):**
   ```bash
   npm install -g firebase-tools
   ```
3. **Login to Firebase:**
   ```bash
   firebase login
   ```
Follow the prompts to authenticate and log in.

4. **Initialize Firebase:**
   ```bash
   firebase init
   ```
Follow the prompts and select the hosting option. Configure the project by choosing the build directory as the public directory.

5. **Deploy to Firebase:**
   ```bash
   firebase deploy
   ```
Firebase will provide you with a hosting URL where your React app is now deployed.

The app is now ready for deployment on Firebase hosting!
