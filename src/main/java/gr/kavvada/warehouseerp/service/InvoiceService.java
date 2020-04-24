package gr.kavvada.warehouseerp.service;

import gr.kavvada.warehouseerp.domain.Invoice;
import gr.kavvada.warehouseerp.domain.Invoice_;
import gr.kavvada.warehouseerp.domain.PaymentType;
import gr.kavvada.warehouseerp.repository.InvoiceRepository;
import gr.kavvada.warehouseerp.service.dto.PaymentTypeCountDTO;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Invoice}.
 */
@Service
@Transactional
public class InvoiceService {

    private final Logger log = LoggerFactory.getLogger(InvoiceService.class);

    private final InvoiceRepository invoiceRepository;

    @Autowired
    private EntityManager entityManagerFactory;

    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    /**
     * Save a invoice.
     *
     * @param invoice the entity to save.
     * @return the persisted entity.
     */
    public Invoice save(Invoice invoice) {
        log.debug("Request to save Invoice : {}", invoice);
        return invoiceRepository.save(invoice);
    }

    /**
     * Get all the invoices.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Invoice> findAll(Pageable pageable) {
        log.debug("Request to get all Invoices");
        return invoiceRepository.findAll(pageable);
    }

    /**
     * Get all the invoices with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Invoice> findAllWithEagerRelationships(Pageable pageable) {
        return invoiceRepository.findAllWithEagerRelationships(pageable);
    }

    /**
     * Get one invoice by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Invoice> findOne(Long id) {
        log.debug("Request to get Invoice : {}", id);
        return invoiceRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the invoice by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Invoice : {}", id);
        invoiceRepository.deleteById(id);
    }

    /**
     * Get all the PaymentTypeCountDTOs.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<PaymentTypeCountDTO> findPaymentTypeCounts() {
        log.debug("Request to get all PaymentTypeCountDTOs");

        CriteriaBuilder builder = entityManagerFactory.getCriteriaBuilder();;
        CriteriaQuery<PaymentTypeCountDTO> query = builder.createQuery(PaymentTypeCountDTO.class);
        Root<Invoice> root = query.from(Invoice.class);
        Join<Invoice, PaymentType> joinPaymentType = root.join(Invoice_.paymentType);

        query.multiselect(joinPaymentType, builder.count(joinPaymentType));
        query.groupBy(joinPaymentType);

        return entityManagerFactory.createQuery(query).getResultList();
    }
}
