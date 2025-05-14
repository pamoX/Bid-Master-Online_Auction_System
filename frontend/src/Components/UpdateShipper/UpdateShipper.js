import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import { toast } from 'react-toastify';
import './UpdateShipper.css';

function UpdateShipper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    providerid: '',
    companyname: '',
    companyaddress: '',
    companyemail: '',
    companyphone: '',
    companytype: '',
    rateperkg: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShipper = async () => {
      try {
        let data = location.state?.shipperData;
        if (!data) {
          const res = await publicRequest.get(`/shippers/${id}`);
          data = res.data.data;
        }
        setFormData({
          ...formData,
          ...data,
          rateperkg: data.rateperkg || ''
        });
      } catch (error) {
        console.error('Error fetching shipper:', error);
        toast.error('Failed to load courier details');
      } finally {
        setLoading(false);
      }
    };
    fetchShipper();
  }, [id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'rateperkg' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.put(`/shippers/${id}`, {
        ...formData,
        rateperkg: Number(formData.rateperkg)
      });
      toast.success('Courier updated successfully!');
      navigate('/shippers');
    } catch (error) {
      console.error('Error updating shipper:', error);
      toast.error('Failed to update courier');
    }
  };

  if (loading) {
    return <div className="sh-loading-message">Loading courier data...</div>;
  }

  return (
    <div className="sh-create-shipper-container">
      <h2>Update Shipping Service Provider</h2>
      <form className="sh-shipper-form" onSubmit={handleSubmit}>
        <div className="sh-form-group">
          <label htmlFor="providerid">Shipping Provider ID</label>
          <input
            type="text"
            name="providerid"
            value={formData.providerid || ''}
            onChange={handleChange}
            readOnly
            className="readonly-input"
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="companyname">Company Name</label>
          <input
            type="text"
            name="companyname"
            value={formData.companyname || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="companyaddress">Address</label>
          <input
            type="text"
            name="companyaddress"
            value={formData.companyaddress || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="companyemail">Email Address</label>
          <input
            type="email"
            name="companyemail"
            value={formData.companyemail || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="companyphone">Contact Number</label>
          <input
            type="tel"
            name="companyphone"
            value={formData.companyphone || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="sh-form-group">
          <label htmlFor="companytype">Company Type</label>
          <select
            name="companytype"
            value={formData.companytype || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Local">Local</option>
            <option value="International">International</option>
          </select>
        </div>
        <div className="sh-form-group">
          <label htmlFor="rateperkg">Rate per kg ($)</label>
          <input
            type="number"
            name="rateperkg"
            value={formData.rateperkg || ''}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="sh-form-actions">
          <button type="submit" className="sh-btn-submit">
            Update Shipping Service Provider
          </button>
          <button
            type="button"
            className="sh-btn-cancel"
            onClick={() => navigate('/shippers')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateShipper;

/* import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { publicRequest } from '../../requestMethods';
import { toast } from 'react-toastify';
import './UpdateShipper.css';

function UpdateShipper() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        providerid: '',
        companyname: '',
        companyaddress: '',
        companyemail: '',
        companyphone: '',
        companytype: '',
        rateperkg: ''
    });

    useEffect(() => {
        const fetchShipper = async () => {
            try {
                const res = await publicRequest.get(`/shippers/${id}`);
                setFormData(res.data.data);
            } catch (error) {
                console.error('Error fetching shipper:', error);
                toast.error('Failed to load courier details');
            }
        };
        fetchShipper();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await publicRequest.put(`/shippers/${id}`, {
                ...formData,
                rateperkg: Number(formData.rateperkg)
            });
            toast.success('Courier updated successfully!');
            navigate('/shippers');
        } catch (error) {
            toast.error('Failed to update courier');
        }
    };

    return (
        <div className="sh-create-shipper-container">
            <form className="sh-shipper-form" onSubmit={handleSubmit}>
                <h2>Update Shipping Service Provider</h2>

                <div className="sh-form-group">
                    <label htmlFor="providerid">Shipping Provider ID</label>
                    <input
                        type="text"
                        name="providerid"
                        value={formData.providerid || ''}
                        onChange={handleChange}
                        readOnly
                        className="readonly-input"
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companyname">Company Name</label>
                    <input
                        type="text"
                        name="companyname"
                        value={formData.companyname || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companyaddress">Address</label>
                    <input
                        type="text"
                        name="companyaddress"
                        value={formData.companyaddress || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companyemail">Email Address</label>
                    <input
                        type="email"
                        name="companyemail"
                        value={formData.companyemail || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companyphone">Contact Number</label>
                    <input
                        type="tel"
                        name="companyphone"
                        value={formData.companyphone || ''}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="sh-form-group">
                    <label htmlFor="companytype">Company Type</label>
                    <select
                        name="companytype"
                        value={formData.companytype || ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="Local">Local</option>
                        <option value="International">International</option>
                    </select>
                </div>

                <div className="sh-form-group">
                    <label htmlFor="rateperkg">Rate per kg ($)</label>
                    <input
                        type="number"
                        name="rateperkg"
                        value={formData.rateperkg || ''}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="sh-form-actions">
                    <button type="submit" className="sh-btn-submit">
                        Update Shipping Service Provider
                    </button>
                    <button
                        type="button"
                        className="sh-btn-cancel"
                        onClick={() => navigate('/shippers')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateShipper;
 */