import { it, expect, describe, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest';
import { useAuthData } from '../state-management/store';
import Layout from '../pages/Layout';
import { Provider } from '../components/ui/provider';
import { BrowserRouter } from 'react-router-dom';
import employees from './__mocks__/employees_mock_data';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmployeesTable from '../components/EmployeesTable';
import apiClient from './__mocks__/employees_mock_service';
describe('layout links according to auth data', () => {
  it('for no authenticated user only login link should appear', () => {
    useAuthData.setState({ userData: null });
    render(<Provider><BrowserRouter><Layout /></BrowserRouter></Provider>);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link")).toHaveTextContent(/login/i)
  });
  it('for authenticated user with role "USER" should appear Logout, Home, Statistics', () => {
    useAuthData.setState({ userData: { role: "USER", email: "email", token: "token" } });
    render(<Provider><BrowserRouter><Layout /></BrowserRouter></Provider>);
    expect(screen.queryByText(/home/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/statistics/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/add/i)).not.toBeInTheDocument();



  })
  it('for authenticated user with role "ADMIN" should appear Logout, Home, Statistics, Add Employee', () => {
    useAuthData.setState({ userData: { role: "ADMIN", email: "email", token: "token" } });
    render(<Provider><BrowserRouter><Layout /></BrowserRouter></Provider>);
    expect(screen.queryByText(/home/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).toBeInTheDocument();
    expect(screen.queryByText(/statistics/i)).toBeInTheDocument();
    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/add employee/i)).toBeInTheDocument();



  });
  describe(`Employees Table contains ${employees.length} rows with or without "Delete" buttons`, () => {
    it(`User with role "USER" no "Delete" buttons should appear`, async () => {
      useAuthData.setState({ userData: { role: "USER", email: "email", token: "token" } })
      render(<Provider>
        <QueryClientProvider client={new QueryClient()}>
          <EmployeesTable queryKey={["employees"]} queryFn={() => apiClient.getAll()}
            updateFn={() => apiClient.updateEmployee({ id: "1", fields: {} })}
            deleteFn={() => apiClient.deleteEmployee("1")}></EmployeesTable>
        </QueryClientProvider>
      </Provider>)
      await expect(screen.findAllByText(/vasya/i)).resolves.toHaveLength(employees.length)
      await expect(screen.findByRole('button', { name: /delete/i })).rejects.toThrow()
    })
    it(`User with role "USER" no "Delete" buttons should appear`, async () => {
      useAuthData.setState({ userData: { role: "ADMIN", email: "email", token: "token" } })
      render(<Provider>
        <QueryClientProvider client={new QueryClient()}>
          <EmployeesTable queryKey={["employees"]} queryFn={() => apiClient.getAll()}
            updateFn={() => apiClient.updateEmployee({ id: "1", fields: {} })}
            deleteFn={() => apiClient.deleteEmployee("1")}></EmployeesTable>
        </QueryClientProvider>
      </Provider>)
      await expect(screen.findAllByText(/vasya/i)).resolves.toHaveLength(employees.length)
      await expect(screen.findAllByRole('button', { name: /delete/i })).resolves.toHaveLength(employees.length)
    })
  })
})